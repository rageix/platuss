import db from '@/lib/db';
import { JoiSettings } from '@/lib/joi';
import respond from '@/lib/response/respond';
import Joi from 'joi';
import argon2 from 'argon2';
import { NextRequest } from 'next/server';

interface PostRequest {
  email: string;
  password: string;
  terms: boolean
}

const postSchema = Joi.object<PostRequest>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().alphanum().min(1).required(),
  terms: Joi.boolean().invalid(false).required()
});

export async function POST(req: NextRequest) {
  try {
    const result = postSchema.validate(await req.json(), JoiSettings);

    if (result.error) {
      return respond.withValidationErrors(result);
    }

    const count = await db.users.count({
      where: { email: result.value.email },
    });

    if (count > 0) {
      return respond.withErrors(['Email is already in use.']);
    }

    const hash = await argon2.hash(result.value.password);

    await db.users.create({
      data: {
        firstName: '',
        lastName: '',
        email: result.value.email,
        emailVerified: false,
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: {
          create: {
            hash: hash
          }
        },
        verifyEmail: {
          create: {
            createdAt: new Date(),
          }
        }
      },
    });

    // todo: send email for verification

    return respond.withOk();
  } catch (error) {
    return respond.withServerError(req, error);
  }
}
