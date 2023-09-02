import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SignUpForm from "@/components/signUpForm/SignUpForm";
import QueryWrapper from "../../../__tests__/QueryWrapper";

enum TestIds {
  emailInput= 'email',
  passwordInput = 'password',
  passwordAgainInput = 'passwordAgain',
  acceptTermsCheckbox = 'acceptTerms',
  submitButton = 'submitButton'
}

describe('<SignUpForm />', () => {

  const renderComponent = () => {
    return render(<QueryWrapper>
      <SignUpForm/>
    </QueryWrapper>);
  }

  it('renders correctly', async () => {
    renderComponent();

    expect(screen.getByTestId<HTMLFormElement>('signUpForm')).toBeVisible();

  });

  it('email field works', async () => {
    renderComponent();

    const emailInput = screen.getByTestId<HTMLInputElement>(TestIds.emailInput);
    const passwordInput = screen.getByTestId<HTMLInputElement>(TestIds.passwordInput);
    const passwordAgainInput = screen.getByTestId<HTMLInputElement>(TestIds.passwordAgainInput);
    const acceptTermsCheckbox = screen.getByTestId<HTMLInputElement>(TestIds.acceptTermsCheckbox);

    fireEvent.change(emailInput, {target: {value: 'tuser@test.com'}});
    expect(emailInput.value).toBe('tuser@test.com');

    fireEvent.change(passwordInput, {target: {value: 'testpass1'}});
    expect(passwordInput.value).toBe('testpass1');

    fireEvent.change(passwordAgainInput, {target: {value: 'testpass2'}});
    expect(passwordAgainInput.value).toBe('testpass2');

    fireEvent.click(acceptTermsCheckbox);
    expect(acceptTermsCheckbox).toBeChecked();

  });

  it('submit states', async () => {
    renderComponent();

    const emailInput = screen.getByTestId<HTMLInputElement>(TestIds.emailInput);
    const passwordInput = screen.getByTestId<HTMLInputElement>(TestIds.passwordInput);
    const passwordAgainInput = screen.getByTestId<HTMLInputElement>(TestIds.passwordAgainInput);
    const acceptTermsCheckbox = screen.getByTestId<HTMLInputElement>(TestIds.acceptTermsCheckbox);
    const submitButton = screen.getByTestId<HTMLInputElement>(TestIds.submitButton);

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, {target: {value: 'tuser@test.com'}});
    fireEvent.change(passwordInput, {target: {value: 'testpass1'}});
    fireEvent.change(passwordAgainInput, {target: {value: 'testpass2'}});
    fireEvent.click(acceptTermsCheckbox);

    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordAgainInput, {target: {value: 'testpass1'}});

    expect(submitButton).toBeEnabled();

    fireEvent.change(emailInput, {target: {value: 'tuser'}});

    expect(submitButton).toBeDisabled();

  });

});
