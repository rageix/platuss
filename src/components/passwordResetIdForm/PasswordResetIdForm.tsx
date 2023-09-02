'use client';
import FormErrors from '../formError/FormErrors';
import Input from '../input/Input';
import PrimaryButton from '../buttons/PrimaryButton';
import FormLabel from '@/components/formLabel/FormLabel';
import Former, { ValidateFn } from '@rageix/former';
import { postData } from '@/lib/requests';
import { ApiPasswordResetIdPost } from '@/app/api/passwordReset/id/route';
import { ResponseType } from '@/types/backendResponse';
import { useParams, usePathname } from 'next/navigation';
import { getZodErrors } from '@/lib/getZodErrors';
import { zPasswordValidator } from '@/lib/validation';
import { useEffect } from 'react';

interface Form {
  password: string;
  passwordAgain: string;
}

const form = new Former<Form>({
  defaultValues: {
    password: '',
    passwordAgain: '',
  },
});

const passwordValidator: ValidateFn = (value) =>
  getZodErrors(
    zPasswordValidator
      .refine(
        (val) => {
          return val === form.getValues().passwordAgain;
        },
        {
          message: 'Password must match Password (Again)',
        },
      )
      .safeParse(value),
  );

const passwordAgainValidator: ValidateFn = (value) =>
  getZodErrors(
    zPasswordValidator
      .refine(
        (val) => {
          return val === form.getValues().password;
        },
        {
          message: 'Password (Again) must match Password.',
        },
      )
      .safeParse(value),
  );

export default function PasswordResetIdForm() {
  const params = useParams();
  const path = usePathname();

  form.useForm(async (values) => {
    const response = await postData<ApiPasswordResetIdPost, never>(
      '/api/passwordReset/id',
      {
        password: values.password,
        id: params.id as string,
      },
    );

    if (response.type === ResponseType.Ok) {
      window.location.href = '/passwordReset/success';
    }
  });

  useEffect(() => {
    form.reset();
  }, [path]);

  return (
    <form
      data-testid="passwordResetIdForm"
      className="space-y-6"
      {...form.getFormProps()}
    >
      <form.Field
        name="password"
        validateOtherFields={['passwordAgain']}
        validate={passwordValidator}
        children={(field) => (
          <div>
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="password">Password</FormLabel>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                data-testid="password"
                type="password"
                autoComplete="current-password"
                aria-describedby="passwordErrors"
                aria-invalid={field.hasErrors()}
                {...field.getValueProps()}
              />
            </div>
            <FormErrors
              errors={field.state.errors}
              id="passwordErrors"
              data-testid="passwordErrors"
            />
          </div>
        )}
      />
      <form.Field
        name="passwordAgain"
        validateOtherFields={['password']}
        validate={passwordAgainValidator}
        children={(field) => (
          <div>
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="passwordAgain">Password (Again)</FormLabel>
            </div>
            <div className="mt-2">
              <Input
                id="passwordAgain"
                name="passwordAgain"
                data-testid="passwordAgain"
                type="password"
                autoComplete="current-password"
                aria-describedby="passwordAgainErrors"
                aria-invalid={field.hasErrors()}
                {...field.getValueProps()}
              />
            </div>
            <FormErrors
              errors={field.state.errors}
              id="passwordAgainErrors"
              data-testid="passwordAgainErrors"
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
          Reset password
        </PrimaryButton>
      </div>
    </form>
  );
}
