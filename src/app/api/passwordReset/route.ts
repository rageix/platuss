import db from '@/lib/db';
import respond from '@/lib/respond';
import { NextRequest } from 'next/server';
import moment from 'moment';
import { z } from 'zod';

const postSchema = z.object({
  email: z.string().trim().email(),
});

export type ApiPasswordResetPost = z.infer<typeof postSchema>;

export async function POST(req: NextRequest) {
  try {
    const result = postSchema.safeParse(await req.json());

    if (!result.success) {
      return respond.withValidationErrors(result.error);
    }

    const { data } = result;

    const user = await db.users.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return respond.withOk();
    }

    if (!user.active) {
      return respond.withErrors([
        'This account has been deactivated, please contact support.',
      ]);
    }

    await db.passwordReset.create({
      data: {
        userId: user.id,
        expiresAt: moment().add(1, 'hour').toDate(),
      },
    });

    // todo: send email

    return respond.withOk();
  } catch (error) {
    return respond.withServerError(req, error);
  }
}
