import { Metadata } from 'next';
import SuccessView from '@/components/successView/SuccessView';

export const metadata: Metadata = {
  title: 'Verify email - success',
};

const message = (
  <>
    Your email has been verified.
    <br />
    You can continue to use the website normally.
  </>
);

export default async function Page() {
  return (
    <SuccessView
      h2="Success!"
      message={message}
    />
  );
}
