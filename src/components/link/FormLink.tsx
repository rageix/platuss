import { classNames } from '@/lib/lib';
import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface Props extends LinkProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function FormLink(props: Props) {
  return (
    <Link
      {...props}
      className={classNames(
        'font-semibold leading-6',
        props.className ? props.className : '',
        props['aria-invalid']
          ? 'text-red-600 hover:text-red-500'
          : 'text-indigo-600 hover:text-indigo-500',
      )}
    ></Link>
  );
}
