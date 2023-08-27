import { PropsWithChildren } from 'react';
import Logo from '@/components/logo/Logo';

interface Props extends PropsWithChildren {
  h2: string;
}

export default function FormWrapper(props: Props) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo className="h-10 w-10 mx-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {props.h2}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {props.children}
      </div>
    </div>
  );
}
