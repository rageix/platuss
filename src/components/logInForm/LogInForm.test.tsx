import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LogInForm from '@/components/logInForm/LogInForm';
import QueryWrapper from '../../../__tests__/QueryWrapper';

enum TestIds {
  emailInput = 'email',
  passwordInput = 'password',
  rememberMeCheckbox = 'rememberMe',
  submitButton = 'submitButton',
}

describe('<LogInForm />', () => {
  const renderComponent = () => {
    return render(
      <QueryWrapper>
        <LogInForm />
      </QueryWrapper>,
    );
  };

  it('renders correctly', async () => {
    renderComponent();

    expect(screen.getByTestId<HTMLFormElement>('loginForm')).toBeVisible();
  });

  it('email field works', async () => {
    renderComponent();

    const emailInput = screen.getByTestId<HTMLInputElement>(TestIds.emailInput);
    const passwordInput = screen.getByTestId<HTMLInputElement>(
      TestIds.passwordInput,
    );
    const rememberMeCheckbox = screen.getByTestId<HTMLInputElement>(
      TestIds.rememberMeCheckbox,
    );

    fireEvent.change(emailInput, { target: { value: 'tuser@test.com' } });
    expect(emailInput.value).toBe('tuser@test.com');

    fireEvent.change(passwordInput, { target: { value: 'testpass1' } });
    expect(passwordInput.value).toBe('testpass1');

    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).not.toBeChecked();
  });

  it('submit states', async () => {
    renderComponent();

    const emailInput = screen.getByTestId<HTMLInputElement>(TestIds.emailInput);
    const passwordInput = screen.getByTestId<HTMLInputElement>(
      TestIds.passwordInput,
    );
    const submitButton = screen.getByTestId<HTMLInputElement>(
      TestIds.submitButton,
    );

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'tusertest.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass1' } });

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'tuser@test.com' } });
  });
});
