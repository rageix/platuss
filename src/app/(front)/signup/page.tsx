import SignUpForm from "@/components/signUpForm/SignUpForm";
import { Metadata } from "next";
import FormLink from "@/components/link/FormLink";
import FormWrapper from "@/components/wrappers/FormWrapper";

export const metadata: Metadata = {
  title: 'Sign up',
}

export default function Page() {
  return (
    <FormWrapper h2="Create new account">
      <SignUpForm/>
      <p className="mt-10 text-center text-sm text-gray-500">
        <FormLink href="/login">
          Already have an account? Log in instead.
        </FormLink>
      </p>
    </FormWrapper>
  )
}
