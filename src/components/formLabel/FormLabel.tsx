import { LabelHTMLAttributes } from 'react';
import { classNames } from '@/lib/lib';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function FormLabel(props: Props) {
  return (
    <label
      {...props}
      className={classNames(
        'block text-sm font-medium leading-6',
        props.className ? props.className : '',
        props['aria-invalid'] ? 'text-red-700' : 'text-gray-900',
      )}
    ></label>
  );
}
