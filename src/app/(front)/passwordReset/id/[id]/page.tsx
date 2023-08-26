import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import PasswordResetIdForm from '@/components/passwordResetIdForm/PasswordResetIdForm';
import FormWrapper from '@/components/wrappers/FormWrapper';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Password reset',
};

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export default async function Page(props: Props) {
  try {
    const result = paramsSchema.safeParse(props.params);

    if (!result.success) {
      return redirect('/');
    }

    const { data } = result;

    const reset = await db.passwordReset.findUnique({
      where: { id: data.id, expiresAt: { gt: new Date() } },
    });

    if (!reset) {
      return redirect('/');
    }

    return (
      <FormWrapper h2="Enter your new password below">
        <PasswordResetIdForm />
      </FormWrapper>
    );
  } catch (error) {
    throw error;
  }
}
