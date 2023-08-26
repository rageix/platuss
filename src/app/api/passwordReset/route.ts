import db from '@/lib/db';
import { JoiSettings } from '@/lib/joi';
import respond from '@/lib/respond';
import Joi from 'joi';
import { NextRequest } from 'next/server';
import moment from 'moment';
interface PostRequest {
  email: string;
}

const postSchema = Joi.object<PostRequest>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
});

export async function POST(req: NextRequest) {
  try {
    const result = postSchema.validate(await req.json(), JoiSettings);

    if (result.error) {
      return respond.withValidationErrors(result);
    }

    const user = await db.users.findUnique({
      where: { email: result.value.email },
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
