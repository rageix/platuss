import { Dispatch, SetStateAction, useState } from 'react';
import emitStore, { emitterMessage } from '@/lib/emitter';
import { Props as ConfirmationDialogProps } from '../confirmationDialog/ConfirmationDialog';

interface State {
  confirmationDialog: ConfirmationDialogProps;
}

const defaultState: State = {
  confirmationDialog: null,
};

export default class Controller {
  state: State;
  updateState: Dispatch<SetStateAction<State>>;

  setup = () => {
    emitStore.emitter.on(
      emitterMessage.showConfirmationDialog,
      this.onEmitShowConfirmationDialog,
    );
  };

  teardown = () => {
    emitStore.emitter.removeListener(
      emitterMessage.showConfirmationDialog,
      this.onEmitShowConfirmationDialog,
    );
  };

  onRender = () => {
    [this.state, this.updateState] = useState<State>(defaultState);
  };

  setState = (state: State) => {
    this.updateState(state);
  };

  onEmitShowConfirmationDialog = (props: ConfirmationDialogProps) => {
    this.setState({
      ...this.state,
      confirmationDialog: { ...props, show: true },
    });
  };
}
