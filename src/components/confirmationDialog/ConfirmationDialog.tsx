import { Fragment, ReactElement, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import emitter, { emitterMessage } from '@/lib/emitter';

export interface State {
  title?: ReactElement | string;
  text?: ReactElement | string;
  okText?: string;
  cancelText?: string;
  onClickOk: (() => Promise<void>) | (() => void);
  onClickCancel?: () => void;
}

const defaultState: State = {
  title: 'Are you sure?',
  text: '',
  okText: 'Ok',
  cancelText: 'Cancel',
  onClickOk: () => alert('No onClickOk function set.'),
};

export default function ConfirmationDialog() {
  const [state, setState] = useState<State>(defaultState);
  const [show, setShow] = useState(false);
  const cancelButtonRef = useRef(null);

  function onClickOk() {
    if (state.onClickOk) {
      state.onClickOk();
    }

    setShow(false);
  }

  function onShowConfirmationDialog(arg: State) {
    setState({ ...state, ...arg });
    setShow(true);
  }

  function onClickCancel() {
    if (state.onClickCancel) {
      state.onClickCancel();
    }

    setShow(false);
  }

  useEffect(() => {
    emitter.on<State>(
      emitterMessage.showConfirmationDialog,
      onShowConfirmationDialog,
    );
  }, []);

  return (
    <Transition.Root
      show={show}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setShow}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-yellow-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {state.title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{state.text}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={onClickOk}
                  >
                    {state.okText}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={onClickCancel}
                    ref={cancelButtonRef}
                  >
                    {state.cancelText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
