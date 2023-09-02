import { ButtonHTMLAttributes } from 'react';
import { classNames } from '@/lib/lib';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasError?: boolean;
}

export default function DangerButton(props: Props) {
  return (
    <button
      {...props}
      className={classNames(
        'flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ',
        props.className ? props.className : '',
        props.disabled
          ? ''
          : 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600',
      )}
    >
      {props.children}
    </button>
  );
}
