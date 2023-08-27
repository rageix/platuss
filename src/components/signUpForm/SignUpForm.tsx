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
    <form
      className="space-y-6"
      onSubmit={controller.onSubmitForm}
      data-testid="signUpForm"
    >
      <div>
        <FormLabel htmlFor="email">Email</FormLabel>
        <div className="mt-2">
          <Input
            id="email"
            name="email"
            data-testid="email"
            autoComplete="email"
            value={form.email}
            onChange={controller.onChangeEmail}
            aria-describedby="emailErrors"
            aria-invalid={emailErrors.length > 0}
          />
        </div>
        <FormErrors
          errors={emailErrors}
          id="emailErrors"
          data-testid="emailErrors"
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
            data-testid="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={controller.onChangePassword}
            aria-describedby="passwordErrors"
            aria-invalid={passwordErrors.length > 0}
          />
        </div>
        <FormErrors
          errors={passwordErrors}
          id="passwordErrors"
          data-testid="passwordErrors"
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
            data-testid="passwordAgain"
            type="password"
            autoComplete="current-password"
            value={form.passwordAgain}
            onChange={controller.onChangePasswordAgain}
            aria-describedby="passwordAgainErrors"
            aria-invalid={passwordAgainErrors.length > 0}
          />
        </div>
        <FormErrors
          errors={passwordAgainErrors}
          id="passwordAgainErrors"
          data-testid="passwordAgainErrors"
        />
      </div>
      <div className="mt-2">
        <div className="flex items-center">
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            data-testid="acceptTerms"
            aria-describedby="termsErrors"
            onChange={controller.onChangeTerms}
            checked={form.terms}
            aria-invalid={termsErrors.length > 0}
          />
          <Label
            className="ml-3"
            htmlFor="acceptTerms"
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
          id="termsErrors"
          data-testid="termsErrors"
        />
      </div>
      <div>
        <PrimaryButton
          type="submit"
          className="w-full"
          disabled={!state.editable || state.errors.length > 0}
          data-testid="submitButton"
        >
          Sign up
        </PrimaryButton>
      </div>
    </form>
  );
}
