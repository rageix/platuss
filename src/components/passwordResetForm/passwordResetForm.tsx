'use client';
import FormErrors from '../formError/FormErrors';
import PrimaryButton from '../buttons/PrimaryButton';
import Input from '../input/Input';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FormLabel from '@/components/formLabel/FormLabel';
import Former, { ValidateFn } from '@rageix/former';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/types/backendResponse';
import { ApiPasswordResetPost } from '@/app/api/passwordReset/route';
import { getZodErrors } from '@/lib/getZodErrors';
import { zedEmailValidator } from '@/lib/validation';

interface Form {
  email: string;
}

const form = new Former<Form>({
  defaultValues: {
    email: '',
  },
});

const emailFieldValidator: ValidateFn = (value) =>
  getZodErrors(zedEmailValidator.safeParse(value));

export default function PasswordResetForm() {
  const path = usePathname();
  const router = useRouter();

  form.useForm(async (values) => {
    const response = await postData<ApiPasswordResetPost, never>(
      '/api/passwordReset',
      values,
    );

    if (response.type === ResponseType.Ok) {
      router.push('/passwordReset/checkEmail');
    }
  });

  useEffect(() => {
    form.reset();
  }, [path]);

  return (
    <form
      data-testid="passwordResetForm"
      className="space-y-6"
      {...form.getFormProps()}
    >
      <form.Field
        name="email"
        validate={emailFieldValidator}
        children={(field) => (
          <div>
            <FormLabel htmlFor="email">Email</FormLabel>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                data-testid="email"
                autoComplete="email"
                aria-describedby="emailErrors"
                aria-invalid={field.hasErrors()}
                {...field.getValueProps()}
              />
            </div>
            <FormErrors
              errors={field.state.errors}
              id="emailErrors"
              data-testid="emailErrors"
            />
          </div>
        )}
      />
      <div>
        <PrimaryButton
          data-testid="submitButton"
          type="submit"
          className="w-full"
          disabled={!form.valid}
        >
          Reset Password
        </PrimaryButton>
      </div>
    </form>
  );
}
