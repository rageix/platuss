'use client';
import FormLink from '../link/FormLink';
import Controller from './Controller';
import { formErrorsByPath } from '@/lib/lib';
import FormErrors from '../formError/FormErrors';
import Input from '../input/Input';
import Checkbox from '../checkbox/Checkbox';
import PrimaryButton from '../buttons/PrimaryButton';
import Label from '../label/Label';
import FormLabel from '@/components/formLabel/FormLabel';
import Logo from '@/components/logo/Logo';

const controller = new Controller();
export default function SignUpForm() {
  controller.onRender();
  const state = controller.state;
  const form = controller.form;
  const emailErrors = formErrorsByPath(state, 'email');
  const passwordErrors = formErrorsByPath(state, 'password');
  const passwordAgainErrors = formErrorsByPath(state, 'passwordAgain');
  const termsErrors = formErrorsByPath(state, 'terms');

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={controller.onSubmitForm}
          >
            <div>
              <FormLabel htmlFor="email">Email</FormLabel>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={controller.onChangeEmail}
                  aria-describedby="email-errors"
                  aria-invalid={emailErrors.length > 0}
                />
              </div>
              <FormErrors
                errors={emailErrors}
                id="email-errors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="password">Password</FormLabel>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={controller.onChangePassword}
                  aria-describedby="password-errors"
                  aria-invalid={passwordErrors.length > 0}
                />
              </div>
              <FormErrors
                errors={passwordErrors}
                id="password-errors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="passwordAgain">Password (Again)</FormLabel>
              </div>
              <div className="mt-2">
                <Input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  value={form.passwordAgain}
                  onChange={controller.onChangePasswordAgain}
                  aria-describedby="password-again-errors"
                  aria-invalid={passwordAgainErrors.length > 0}
                />
              </div>
              <FormErrors
                errors={passwordAgainErrors}
                id="password-again-errors"
              />
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <Checkbox
                  id="accept-terms"
                  name="accept-terms"
                  aria-describedby="terms-errors"
                  onChange={controller.onChangeTerms}
                  checked={form.terms}
                  aria-invalid={termsErrors.length > 0}
                />
                <Label
                  className="ml-3"
                  htmlFor="accept-terms"
                  aria-invalid={termsErrors.length > 0}
                >
                  <span>I have read and accept the </span>
                  <FormLink
                    href="#"
                    target="_blank"
                    aria-invalid={termsErrors.length > 0}
                  >
                    terms of service
                  </FormLink>
                  .
                </Label>
              </div>
              <FormErrors
                errors={termsErrors}
                id="terms-errors"
              />
            </div>
            <div>
              <PrimaryButton
                type="submit"
                className="w-full"
                disabled={!state.editable || state.errors.length > 0}
              >
                Sign up
              </PrimaryButton>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            <FormLink href="/login">
              Already have an account? Log in instead.
            </FormLink>
          </p>
        </div>
      </div>
    </>
  );
}
