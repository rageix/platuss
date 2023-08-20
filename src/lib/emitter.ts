import { EventEmitter } from 'eventemitter3';
import { Props as ConfirmationDialogProps } from '../components/confirmationDialog/ConfirmationDialog';

export enum emitterMessage {
  notificationError = 'notificationError',
  currentUserUpdated = 'currentUserUpdated',
  showConfirmationDialog = 'showConfirmationDialog',
}

export class Emitter {
  emitter = new EventEmitter();

  on = (message: emitterMessage, fn: (...args: unknown[]) => void) => {
    this.emitter.on(message, fn);
  };

  off = (message: emitterMessage, fn: (...args: unknown[]) => void) => {
    this.emitter.off(message, fn);
  };

  emitCurrentUserUpdated = () => {
    console.log('emit current user updated');
    this.emitter.emit(emitterMessage.currentUserUpdated);
  };

  emitNotificationError = (arg: string) => {
    this.emitter.emit(emitterMessage.notificationError, arg);
  };

  emitShowConfirmationDialog = (arg: ConfirmationDialogProps) => {
    this.emitter.emit(emitterMessage.showConfirmationDialog, arg);
  };
}

export default new Emitter();
