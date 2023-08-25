import { Metadata } from 'next';
import { redirectIfLoggedIn } from '@/lib/redirectIf';
import PasswordResetForm
  from '@/components/passwordResetForm/passwordResetForm';
import FormLink from "@/components/link/FormLink";
import React from "react";
import FormWrapper from "@/components/wrappers/FormWrapper";

export const metadata: Metadata = {
  title: 'Password reset',
};

export default async function Page() {
  return (await redirectIfLoggedIn('/')) ||
    <FormWrapper h2="Reset your password">
      <PasswordResetForm/>
      <p className="mt-10 text-center text-sm text-gray-500">
        <FormLink
          href="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Remember your password? Log in instead.
        </FormLink>
      </p>
    </FormWrapper>
}
