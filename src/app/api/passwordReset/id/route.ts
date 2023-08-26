import db from '@/lib/db';
import respond from '@/lib/respond';
import { NextRequest } from 'next/server';
import hashPassword from '@/lib/hashPassword';
import { z } from 'zod';

const postSchema = z.object({
  id: z.string().uuid(),
  password: z.string(),
});

export type ApiPasswordResetIdPost = z.infer<typeof postSchema>;

export async function POST(req: NextRequest) {
  try {
    const result = postSchema.safeParse(await req.json());

    if (!result.success) {
      return respond.withValidationErrors(result.error);
    }

    const { data } = result;

    const reset = await db.passwordReset.findUnique({
      where: {
        id: data.id,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!reset) {
      return respond.withErrors(['Invalid request.']);
    }

    const hash = await hashPassword(data.password);

    const updatePassword = db.passwords.update({
      where: { userId: reset.userId },
      data: { hash: hash },
    });

    const deleteReset = db.passwordReset.delete({ where: { id: reset.id } });

    await db.$transaction([updatePassword, deleteReset]);

    return respond.withOk();
  } catch (error) {
    return respond.withServerError(req, error);
  }
}
