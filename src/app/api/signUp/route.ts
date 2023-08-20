import db from '@/lib/db';
import { JoiSettings } from '@/lib/joi';
import respond from '@/lib/response/respond';
import Joi from 'joi';
import { NextRequest } from 'next/server';
import { passwordValidator } from "@/lib/validators";
import hashPassword from "@/lib/hashPassword";

interface PostRequest {
  email: string;
  password: string;
  terms: boolean
}

const postSchema = Joi.object<PostRequest>({
  email: Joi.string()
    .trim()
    .email({tlds: {allow: false}})
    .required(),
  password: passwordValidator.required(),
  terms: Joi.boolean().invalid(false).required()
});

export async function POST(req: NextRequest) {
  try {
    const result = postSchema.validate(await req.json(), JoiSettings);

    if (result.error) {
      return respond.withValidationErrors(result);
    }

    const count = await db.users.count({
      where: {email: result.value.email},
    });

    if (count > 0) {
      return respond.withErrors(['Email is already in use.']);
    }

    const hash = await hashPassword(result.value.password);

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
