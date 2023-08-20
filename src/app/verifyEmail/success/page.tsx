import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify email - success',
};

export default async function Page() {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Success!
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Your email has been verified.<br/>
            You can continue to use the website normally.
          </p>
        </div>
      </div>
    </div>
  );
}
