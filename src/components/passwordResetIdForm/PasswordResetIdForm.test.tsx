import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import QueryWrapper from "../../../__tests__/QueryWrapper";
import PasswordResetIdForm
  from "@/components/passwordResetIdForm/PasswordResetIdForm";

enum TestIds {
  passwordInput = 'password',
  passwordAgainInput = 'passwordAgain',
  submitButton = 'submitButton'
}

describe('<PasswordResetIdForm />', () => {

  const renderComponent = () => {
    return render(<QueryWrapper>
      <PasswordResetIdForm/>
    </QueryWrapper>);
  }

  it('renders correctly', async () => {
    renderComponent();

    expect(screen.getByTestId<HTMLFormElement>('passwordResetIdForm')).toBeVisible();

  });

  it('fields works', async () => {
    renderComponent();

    const passwordInput = screen.getByTestId<HTMLInputElement>(TestIds.passwordInput);
    const passwordAgainInput = screen.getByTestId<HTMLInputElement>(TestIds.passwordAgainInput);

    fireEvent.change(passwordInput, {target: {value: 'testpass1'}});
    expect(passwordInput.value).toBe('testpass1');

    fireEvent.change(passwordAgainInput, {target: {value: 'testpass2'}});
    expect(passwordAgainInput.value).toBe('testpass2');

  });

  it('submit states', async () => {
    renderComponent();

    const passwordInput = screen.getByTestId<HTMLInputElement>(TestIds.passwordInput);
    const passwordAgainInput = screen.getByTestId<HTMLInputElement>(TestIds.passwordAgainInput);
    const submitButton = screen.getByTestId<HTMLInputElement>(TestIds.submitButton);

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordInput, {target: {value: 'testpass1'}});
    fireEvent.change(passwordAgainInput, {target: {value: 'testpass2'}});
    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordAgainInput, {target: {value: 'testpass1'}});

    expect(submitButton).toBeEnabled();

  });

});
