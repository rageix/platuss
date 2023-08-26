import db from '@/lib/db';
import respond from '@/lib/respond';
import argon2 from 'argon2';
import { NextRequest } from 'next/server';
import { getSession } from '@/lib/getSession';
import { setSession } from '@/lib/setSession';
import { z } from 'zod';

const invalidCredentials = 'Invalid credentials.';

const postSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1),
  rememberMe: z.boolean().optional().default(true),
});

export type ApiLoginPost = z.infer<typeof postSchema>;

export async function POST(req: NextRequest) {
  try {
    const result = postSchema.safeParse(await req.json());

    if (!result.success) {
      return respond.withValidationErrors(result.error);
    }

    const { data } = result;

    const user = await db.users.findUnique({
      where: { email: data.email },
      include: {
        password: true,
      },
    });

    if (!user) {
      return respond.withErrors([invalidCredentials]);
    }

    if (!user.active) {
      return respond.withErrors([
        'This account has been deactivated, please contact support.',
      ]);
    }

    const match = await argon2.verify(
      user.password?.hash as string,
      data.password,
    );

    if (!match) {
      return respond.withErrors([invalidCredentials]);
    }

    const maxAge = !data.rememberMe ? 2592000 : undefined;

    let session = getSession(req.cookies);

    session = { ...session, userId: user.id };

    return setSession(respond.withOk(), session, {
      maxAge: maxAge,
      sameSite: 'none',
    });
  } catch (error) {
    return respond.withServerError(req, error);
  }
}
