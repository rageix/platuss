'use client';
import Controller from './Controller';
import { formErrorsByPath } from '@/lib/lib';
import FormErrors from '../formError/FormErrors';
import PrimaryButton from '../buttons/PrimaryButton';
import Input from '../input/Input';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import FormLabel from '@/components/formLabel/FormLabel';

let controller = new Controller();

export default function PasswordResetForm() {
  controller.onRender();
  const state = controller.state;
  const form = controller.form;
  const path = usePathname();
  const emailErrors = formErrorsByPath(state, 'email');

  useEffect(() => {
    controller.reset();
  }, [path]);

  return (
    <form
      data-testid="passwordResetForm"
      className="space-y-6"
      onSubmit={controller.onSubmitForm}
    >
      <div>
        <FormLabel
          htmlFor="email"
          className="block"
        >
          Email
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
        <PrimaryButton
          data-testid="submitButton"
          type="submit"
          className="w-full"
          disabled={!state.editable || state.errors.length > 0}
        >
          Reset Password
        </PrimaryButton>
      </div>
    </form>
  );
}
