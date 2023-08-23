'use client';
import Controller from './Controller';
import { formErrorsByPath } from '@/lib/lib';
import FormErrors from '../formError/FormErrors';
import Input from '../input/Input';
import PrimaryButton from '../buttons/PrimaryButton';
import FormLabel from '@/components/formLabel/FormLabel';

const controller = new Controller();
export default function PasswordResetIdForm() {
  controller.onRender();
  const state = controller.state;
  const form = controller.form;
  const passwordErrors = formErrorsByPath(state, 'password');
  const passwordAgainErrors = formErrorsByPath(state, 'passwordAgain');

  return (
    <form
      data-testid="passwordResetIdForm"
      className="space-y-6"
      onSubmit={controller.onSubmitForm}
    >
      <div>
        <div className="flex items-center justify-between">
          <FormLabel htmlFor="password">Password</FormLabel>
        </div>
        <div className="mt-2">
          <Input
            id="password"
            data-testid="password"
            name="password"
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
          id="passwordEerrors"
          data-testid="passwordEerrors"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <FormLabel htmlFor="passwordAgain">Password (Again)</FormLabel>
        </div>
        <div className="mt-2">
          <Input
            id="passwordAgain"
            data-testid="passwordAgain"
            name="passwordAgain"
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
      <div>
        <PrimaryButton
          data-testid="submitButton"
          type="submit"
          className="w-full"
          disabled={!state.editable || state.errors.length > 0}
        >
          Reset password
        </PrimaryButton>
      </div>
    </form>
  );
}
