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

let controller = new Controller();

export default function LogInForm() {
  controller.onRender();
  const state = controller.state;
  const form = controller.form;
  const path = usePathname();
  const emailErrors = formErrorsByPath(state, 'email');
  const passwordErrors = formErrorsByPath(state, 'password');

  useEffect(() => {
    controller.reset();
  }, [path]);

  return (
    <form
      data-testid="loginForm"
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
            data-testid="email"
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
            data-testid="password"
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
            id="rememberMe"
            data-testid="rememberMe"
            name="rememberMe"
            onChange={controller.onChangeRememberMe}
            checked={form.rememberMe}
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
      <div>
        <PrimaryButton
          data-testid="submitButton"
          type="submit"
          className="w-full"
          disabled={!state.editable || state.errors.length > 0}
        >
          Sign in
        </PrimaryButton>
      </div>
    </form>
  );
}
