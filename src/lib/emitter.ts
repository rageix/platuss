import { EventEmitter } from 'eventemitter3';
import { State as ConfirmationDialogState } from '../components/confirmationDialog/ConfirmationDialog';

export enum emitterMessage {
  notificationError = 'notificationError',
  showConfirmationDialog = 'showConfirmationDialog',
}

export class Emitter {
  emitter = new EventEmitter();

  on = <T>(message: emitterMessage, fn: (arg: T) => void) => {
    this.emitter.on(message, fn);
  };

  off = <T>(message: emitterMessage, fn: (arg: T) => void) => {
    this.emitter.off(message, fn);
  };

  emitNotificationError = (arg: string) => {
    this.emitter.emit(emitterMessage.notificationError, arg);
  };

  emitShowConfirmationDialog = (arg: ConfirmationDialogState) => {
    this.emitter.emit(emitterMessage.showConfirmationDialog, arg);
  };
}

export default new Emitter();
