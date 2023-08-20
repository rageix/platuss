import SignUpForm from "@/components/signUpForm/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign up',
}

export default function Page() {
  return (
    <SignUpForm/>
  )
}
