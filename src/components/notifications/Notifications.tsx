'use client';
import { useEffect } from 'react';
import Controller from './Controller';
import ErrorNotification from '../errorNotification/ErrorNotification';

const controller = new Controller();
export default function Notifications() {
  controller.onRender();

  useEffect(() => {
    controller.setup();

    return () => {
      controller.teardown();
    };
  }, []);

  const state = controller.state;

  return (
    <div
      data-testid="notificationArea"
      aria-label="notifications"
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {state.items.map((v, i) => {
          return (
            <ErrorNotification
              key={i}
              message={v.message}
              onDismiss={() => controller.onClickDismiss(i)}
            />
          );
        })}
      </div>
    </div>
  );
}
