import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';

interface Props {
  message: string;
  onDismiss: () => void;
}
export default function ErrorNotification(props: Props) {
  return (
    <Transition
      show={true}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="error pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon
                className="h-6 w-6 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex w-0 flex-1 justify-between">
              <p className="w-0 flex-1 text-sm font-medium text-gray-900">
                {props.message}
              </p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="close inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={props.onDismiss}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
