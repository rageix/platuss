import db from '@/lib/db';
import { JoiSettings } from '@/lib/joi';
import respond from '@/lib/respond';
import Joi from 'joi';
import argon2 from 'argon2';
import { NextRequest } from 'next/server';
import { getSession } from '@/lib/getSession';
import { setSession } from '@/lib/setSession';

const invalidCredentials = 'Invalid credentials.';

interface PostRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

const postSchema = Joi.object<PostRequest>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().alphanum().min(1).required(),
  rememberMe: Joi.boolean().optional().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const result = postSchema.validate(await req.json(), JoiSettings);

    if (result.error) {
      return respond.withValidationErrors(result);
    }

    const user = await db.users.findUnique({
      where: { email: result.value.email },
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
      user.password.hash,
      result.value.password,
    );

    if (!match) {
      return respond.withErrors([invalidCredentials]);
    }

    const maxAge = !result.value.rememberMe ? 2592000 : null;

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
