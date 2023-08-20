'use client';
import Controller from './Controller';
import { formErrorsByPath } from '@/lib/lib';
import FormErrors from '../formError/FormErrors';
import Input from '../input/Input';
import PrimaryButton from '../buttons/PrimaryButton';
import FormLabel from '@/components/formLabel/FormLabel';
import FormWrapper from "@/components/wrappers/FormWrapper";

const controller = new Controller();
export default function PasswordResetIdForm() {
  controller.onRender();
  const state = controller.state;
  const form = controller.form;
  const passwordErrors = formErrorsByPath(state, 'password');
  const passwordAgainErrors = formErrorsByPath(state, 'passwordAgain');

  return (
    <FormWrapper h2="Enter your new password below">
      <form
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
        <div>
          <PrimaryButton
            type="submit"
            className="w-full"
            disabled={!state.editable || state.errors.length > 0}
          >
            Reset password
          </PrimaryButton>
        </div>
      </form>
    </FormWrapper>
  );
}
