import { Metadata } from 'next';
import Link from "next/link";
import SuccessView from "@/components/successView/SuccessView";

export const metadata: Metadata = {
  title: 'Verify email - success',
};

const message = <>
  Your password has been updated.<br/>
  You can continue to use the website normally.
</>

export default async function Page() {
  return (
    <SuccessView h2="Success!" message={message}>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/login"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Log in
        </Link>
      </div>
    </SuccessView>
  );
}
