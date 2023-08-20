import db from '@/lib/db';
import { JoiSettings } from '@/lib/joi';
import respond from '@/lib/response/respond';
import Joi from 'joi';
import { NextRequest } from 'next/server';
import { passwordValidator, uuidValidator } from "@/lib/validators";
import hashPassword from "@/lib/hashPassword";

interface PostRequest {
  password: string;
  id: string,
}

const postSchema = Joi.object<PostRequest>({
  id: uuidValidator.required(),
  password: passwordValidator.required(),
});

export async function POST(req: NextRequest) {
  try {
    const result = postSchema.validate(await req.json(), JoiSettings);

    if (result.error) {
      return respond.withValidationErrors(result);
    }

    const reset = await db.passwordReset.findUnique({
      where: {id: result.value.id, expires: {gt: new Date()}}
    });

    if (!reset) {
      return respond.withErrors(['Invalid request.']);
    }

    const hash = await hashPassword(result.value.password);

    const updatePassword = db.passwords.update({
      where: {userId: reset.userId},
      data: {hash: hash}
    });

    const deleteReset = db.passwordReset.delete({where: {id: reset.id}});

    await db.$transaction([updatePassword, deleteReset]);

    return respond.withOk();
  } catch (error) {
    return respond.withServerError(req, error);
  }
}
