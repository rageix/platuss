import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import QueryWrapper from '../../../__tests__/QueryWrapper';
import PasswordResetForm from '@/components/passwordResetForm/passwordResetForm';

enum TestIds {
  emailInput = 'email',
  submitButton = 'submitButton',
}

describe('<PasswordResetForm />', () => {
  const renderComponent = () => {
    return render(
      <QueryWrapper>
        <PasswordResetForm />
      </QueryWrapper>,
    );
  };

  it('renders correctly', async () => {
    renderComponent();

    expect(
      screen.getByTestId<HTMLFormElement>('passwordResetForm'),
    ).toBeVisible();
  });

  it('fields works', async () => {
    renderComponent();

    const emailInput = screen.getByTestId<HTMLInputElement>(TestIds.emailInput);

    fireEvent.change(emailInput, { target: { value: 'tuser@test.com' } });
    expect(emailInput.value).toBe('tuser@test.com');
  });

  it('submit states', async () => {
    renderComponent();

    const emailInput = screen.getByTestId<HTMLInputElement>(TestIds.emailInput);
    const submitButton = screen.getByTestId<HTMLInputElement>(
      TestIds.submitButton,
    );

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'testemail.com' } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'tuser@test.com' } });
    expect(submitButton).toBeEnabled();
  });
});
