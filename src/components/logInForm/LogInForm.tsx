'use client';
import Controller from './Controller';
import { formErrorsByPath } from '@/lib/lib';
import FormErrors from '../formError/FormErrors';
import FormLink from '../link/FormLink';
import PrimaryButton from '../buttons/PrimaryButton';
import Input from '../input/Input';
import Checkbox from '../checkbox/Checkbox';
import Label from '../label/Label';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import FormLabel from '@/components/formLabel/FormLabel';
import Logo from "@/components/logo/Logo";

let controller = new Controller();

export default function LogInForm() {
  controller.onRender();
  const state = controller.state;
  const form = controller.form;
  const path = usePathname();
  const emailErrors = formErrorsByPath(state, 'email');
  const passwordErrors = formErrorsByPath(state, 'password');

  useEffect(() => {
    console.log('call reset');
    controller.reset();
  }, [path]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={controller.onSubmitForm}
        >
          <div>
            <FormLabel
              htmlFor="email"
              className="block"
            >
              Email address
            </FormLabel>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                onChange={controller.onChangeEmail}
                value={form.email}
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
              <FormLabel
                htmlFor="password"
                className="block"
              >
                Password
              </FormLabel>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={controller.onChangePassword}
                value={form.password}
                aria-describedby="password-errors"
                aria-invalid={passwordErrors.length > 0}
              />
              <FormErrors
                errors={passwordErrors}
                id="password-errors"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                onChange={controller.onChangeRememberMe}
                checked={form.rememberMe}
              />
              <Label
                className="ml-3"
                htmlFor="remember-me"
              >
                Remember me
              </Label>
            </div>
            <div className="text-sm leading-6">
              <FormLink href="/forgotPassword">Forgot password?</FormLink>
            </div>
          </div>
          <div>
            <PrimaryButton
              type="submit"
              className="w-full"
              disabled={!state.editable || state.errors.length > 0}
            >
              Sign in
            </PrimaryButton>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          <FormLink
            href="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Not a member? Sign up instead.
          </FormLink>
        </p>
      </div>
    </div>
  );
}
