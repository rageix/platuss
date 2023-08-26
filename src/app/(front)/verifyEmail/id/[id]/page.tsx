import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import log from '@/lib/logger';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Verify Email',
};

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

const paramSchema = z.object({
  id: z.string().uuid(),
});

export default async function Page(props: Props) {
  try {
    const result = paramSchema.safeParse(props.params);

    if (!result.success) {
      return redirect('/');
    }

    const { data } = result;

    const verifyEmail = await db.verifyEmail.findUnique({
      where: { id: data.id },
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
