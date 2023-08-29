'use client';
import FormErrors from '../formError/FormErrors';
import FormLink from '../link/FormLink';
import PrimaryButton from '../buttons/PrimaryButton';
import Input from '../input/Input';
import Checkbox from '../checkbox/Checkbox';
import Label from '../label/Label';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FormLabel from '@/components/formLabel/FormLabel';
import Former, { ValidateFn } from '@rageix/former';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/types/backendResponse';
import { ApiLoginPost } from '@/app/api/login/route';
import { zedEmailValidator, zedPasswordValidator } from '@/lib/validation';
import { getZodErrors } from '@/lib/getZodErrors';

interface Form {
  email: string;
  password: string;
  rememberMe: boolean;
}

const form = new Former<Form>({
  defaultValues: {
    email: '',
    password: '',
    rememberMe: true,
  },
});

const emailValidator: ValidateFn = (value) =>
  getZodErrors(zedEmailValidator.safeParse(value));
const passwordValidator: ValidateFn = (value) =>
  getZodErrors(zedPasswordValidator.safeParse(value));

export default function LogInForm() {
  const router = useRouter();
  const path = usePathname();

  form.useForm(async (values) => {
    const response = await postData<ApiLoginPost, never>('/api/login', values);

    if (response.type === ResponseType.Ok) {
      router.push('/dashboard');
    }
  });

  useEffect(() => {
    form.reset();
  }, [path]);

  return (
    <form
      data-testid="loginForm"
      className="space-y-6"
      {...form.getFormProps()}
    >
      <form.Field
        name="email"
        validate={emailValidator}
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
      <form.Field
        name="password"
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
        name="rememberMe"
        children={(field) => (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="rememberMe"
                data-testid="rememberMe"
                name="rememberMe"
                {...field.getCheckedProps()}
              />
              <Label
                className="ml-3"
                htmlFor="rememberMe"
              >
                Remember me
              </Label>
            </div>
            <div className="text-sm leading-6">
              <FormLink href="/passwordReset">Forgot password?</FormLink>
            </div>
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
          Sign in
        </PrimaryButton>
      </div>
    </form>
  );
}
