import LogInForm from '@/components/logInForm/LogInForm';
import { Metadata } from 'next';
import { redirectIfLoggedIn } from '@/lib/redirectIf';
import FormWrapper from "@/components/wrappers/FormWrapper";
import FormLink from "@/components/link/FormLink";

export const metadata: Metadata = {
  title: 'Login',
};

export default async function Page() {
  return await redirectIfLoggedIn('/') ||
    <FormWrapper h2="Log in to your account">
      <LogInForm/>
      <p className="mt-10 text-center text-sm text-gray-500">
        <FormLink
          href="/signup"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Not a member? Sign up instead.
        </FormLink>
      </p>
    </FormWrapper>;
}
