import LogInForm from '@/components/logInForm/LogInForm';
import { Metadata } from 'next';
import { redirectIfLoggedIn } from '@/lib/redirectIf';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function Page() {
  return (await redirectIfLoggedIn('/')) || <LogInForm />;
}
