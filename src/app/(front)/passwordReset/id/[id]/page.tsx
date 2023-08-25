import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { JoiSettings } from '@/lib/joi';
import db from '@/lib/db';
import Joi from 'joi';
import { uuidValidator } from '@/lib/validators';
import PasswordResetIdForm
  from "@/components/passwordResetIdForm/PasswordResetIdForm";
import FormWrapper from "@/components/wrappers/FormWrapper";

export const metadata: Metadata = {
  title: 'Password reset',
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

    const reset = await db.passwordReset.findUnique({
      where: {id: result.value.id, expires: {gt: new Date()}}
    });

    if (!reset) {
      return redirect('/');
    }

    return (
      <FormWrapper h2="Enter your new password below">
        <PasswordResetIdForm/>
      </FormWrapper>
    )

  } catch (error) {
    throw error;
  }
}
