import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password reset - Check email',
};

export default async function Page() {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Check your email.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            If your email is in our system you should receive a password reset
            email shortly. Follow the link in the email to finish resetting your
            password.
            <br />
            If you don&apos;t see the email please check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}
