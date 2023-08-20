import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { JoiSettings } from '@/lib/joi';
import db from '@/lib/db';
import Joi from 'joi';
import { uuidValidator } from '@/lib/validators';
import log from '@/lib/log/logger';
export const metadata: Metadata = {
  title: 'Verify Email',
};


interface Params {
  id: string;
}
interface Props {
  params: Params
}

const getSchema = Joi.object<Params>({
  id: uuidValidator.required(),
});

export default async function Page(props: Props) {
  try {
    const result = getSchema.validate(props.params, JoiSettings);

    if (result.error) {
      return redirect('/');
    }

    const verifyEmail = await db.verifyEmail.findUnique({
      where: { id: result.value.id },
    });

    if (!verifyEmail) {
      return redirect('/');
    }

    const updateUser = db.users.update({
      where: { id: verifyEmail.userId },
      data: { emailVerified: true },
    });

    const deleteVerifyRecord = db.verifyEmail.delete({
      where: { id: verifyEmail.id },
    });

    await db.$transaction([updateUser, deleteVerifyRecord]);

    return redirect('/verifyEmail/success');
  } catch (error) {
    log.error('/verifyEmail error!', error);
    throw error;
  }
}
