import { classNames } from '@/lib/lib';
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

export default function Checkbox(props: Props) {
  return (
    <input
      {...props}
      type="checkbox"
      className={classNames(
        'h-4 w-4 rounded',
        props.className ? props.className : '',
        props["aria-invalid"]
          ? 'border-red-300 text-red-600 focus:ring-red-600'
          : 'border-gray-300 text-indigo-600 focus:ring-indigo-600',
      )}
    />
  );
}
