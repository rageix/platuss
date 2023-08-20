import { Metadata } from 'next';
import { redirectIfLoggedIn } from '@/lib/redirectIf';
import PasswordResetForm from '@/components/passwordResetForm/passwordResetForm';

export const metadata: Metadata = {
  title: 'Password reset',
};

export default async function Page() {
  return (await redirectIfLoggedIn('/')) || <PasswordResetForm />;
}
