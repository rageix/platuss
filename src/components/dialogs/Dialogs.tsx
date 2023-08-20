import { useEffect } from 'react';
import Controller from './Controller';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';

const controller = new Controller();
export default function Dialogs() {
  controller.onRender();

  useEffect(() => {
    controller.setup();

    return () => {
      controller.teardown();
    };
  }, []);

  const state = controller.state;

  return (
    <>
      {state.confirmationDialog && (
        <ConfirmationDialog {...state.confirmationDialog} />
      )}
    </>
  );
}
