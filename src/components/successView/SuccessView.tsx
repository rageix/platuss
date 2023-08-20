import { PropsWithChildren, ReactElement } from 'react';

interface Props extends PropsWithChildren{
  h2: string | ReactElement,
  message: string | ReactElement,
}

export default function SuccessView(props: Props) {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {props.h2}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            {props.message}
          </p>
          {props.children}
        </div>
      </div>
    </div>
  );
}
