'use client';
import FormLink from '../link/FormLink';
import FormErrors from '../formError/FormErrors';
import Input from '../input/Input';
import Checkbox from '../checkbox/Checkbox';
import PrimaryButton from '../buttons/PrimaryButton';
import Label from '../label/Label';
import FormLabel from '@/components/formLabel/FormLabel';
import Former, { ValidateFn } from '@rageix/former';
import { postData } from '@/lib/requests';
import { ApiSignUpPost } from '@/app/api/signUp/route';
import { ResponseType } from '@/types/backendResponse';
import { usePathname, useRouter } from 'next/navigation';
import { z } from 'zod';
import { getZodErrors } from '@/lib/getZodErrors';
import { zedEmailValidator, zedPasswordValidator } from '@/lib/validation';
import { useEffect } from 'react';

interface Form {
  email: string;
  password: string;
  passwordAgain: string;
  terms: boolean;
}

const form = new Former<Form>({
  defaultValues: {
    email: '',
    password: '',
    passwordAgain: '',
    terms: false,
  },
});

const zedTermsValidator = z.boolean();

const emailValidator: ValidateFn = (value) =>
  getZodErrors(zedEmailValidator.safeParse(value));
const passwordValidator: ValidateFn = (value) =>
  getZodErrors(
    zedPasswordValidator
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
    zedPasswordValidator
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

const termsValidator: ValidateFn = (value) =>
  getZodErrors(
    zedTermsValidator
      .refine(
        (val) => {
          return val;
        },
        {
          message: 'You must accept the terms before creating an account.',
        },
      )
      .safeParse(value),
  );

export default function SignUpForm() {
  const router = useRouter();
  const path = usePathname();

  form.useForm(async (values) => {
    const response = await postData<ApiSignUpPost, never>(
      '/api/signUp',
      values,
    );

    if (response.type === ResponseType.Ok) {
      router.push('/');
    }
  });

  useEffect(() => {
    form.reset();
  }, [path]);

  return (
    <form
      className="space-y-6"
      data-testid="signUpForm"
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
      <form.Field
        name="terms"
        validate={termsValidator}
        children={(field) => (
          <div className="mt-2">
            <div className="flex items-center">
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                data-testid="acceptTerms"
                aria-describedby="termsErrors"
                aria-invalid={field.hasErrors()}
                {...field.getCheckedProps()}
              />
              <Label
                className="ml-3"
                htmlFor="acceptTerms"
                aria-invalid={field.hasErrors()}
              >
                <span>I have read and accept the </span>
                <FormLink
                  href="#"
                  target="_blank"
                  aria-invalid={field.hasErrors()}
                >
                  terms of service
                </FormLink>
                .
              </Label>
            </div>
            <FormErrors
              errors={field.state.errors}
              id="termsErrors"
              data-testid="termsErrors"
            />
          </div>
        )}
      />
      <div>
        <PrimaryButton
          type="submit"
          className="w-full"
          disabled={!form.valid}
          data-testid="submitButton"
        >
          Sign up
        </PrimaryButton>
      </div>
    </form>
  );
}
