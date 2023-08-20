import emitStore, { emitterMessage } from '@/lib/emitter';
import { ComponentController } from '@/lib/componentController';

enum NotificationType {
  Error = 0,
}

interface Notification {
  type: NotificationType;
  message: string;
}

interface State {
  items: Notification[];
}

export default class Controller extends ComponentController<State> {
  defaultState: State = {
    items: [],
  };

  setup = () => {
    emitStore.emitter.on(
      emitterMessage.notificationError,
      this.onEmitNotificationError,
    );
  };

  teardown = () => {
    emitStore.emitter.removeListener(
      emitterMessage.notificationError,
      this.onEmitNotificationError,
    );
  };

  onEmitNotificationError = (message: string) => {
    const state = { ...this.state };
    state.items.push({ message: message, type: NotificationType.Error });
    this.setState(state);
  };

  onClickDismiss = (index: number) => {
    const state = { ...this.state };
    state.items.splice(index, 1);
    this.updateState(state);
  };
}
