import { classNames } from '@/lib/lib';
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className={classNames(
        'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
        props.className ? props.className : '',
        props["aria-invalid"]
          ? 'text-red-900 ring-red-300 focus:ring-red-600'
          : 'text-gray-900 ring-gray-300 focus:ring-indigo-600',
      )}
    />
  );
}
