import { Metadata } from 'next';
import SuccessView from "@/components/successView/SuccessView";

export const metadata: Metadata = {
  title: 'Password reset - Check email',
};

const message = <>
  If your email is in our system you should receive a password reset
  email shortly. Follow the link in the email to finish resetting your
  password.
  <br/>
  If you don&apos;t see the email please check your spam folder.
</>

export default async function Page() {
  return (
    <SuccessView h2="Check your email." message={message}/>
  );
}
