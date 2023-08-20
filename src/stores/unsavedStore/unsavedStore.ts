'use client';
import _ from 'lodash';
import emitter from '@/lib/emitter';

const confirmationMessage =
  'You have unsaved changes. If you continue your changes will be lost.';

export interface Unsaved {
  id: string;
  message?: string;
  confirm?: (...args: unknown[]) => void;
  cancel?: (...args: unknown[]) => void;
}

export interface UnsavedWatch {
  id: string;
  watch: string;
  callback: (arg: string) => void;
}

class UnsavedStore {
  private _items: Unsaved[] = [];

  constructor() {
    if(_.isUndefined(window)) { return };
    window.addEventListener('beforeunload', (e) => {
      if (this._items.length === 0) {
        return undefined;
      }

      e.preventDefault();

      // most modern browser dont even allow a custom message
      // anyways, but for legacy reasons...
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
  }

  /**
   * Will upsert based on id provided.
   *
   * @param {Unsaved} data
   */
  set = (data: Unsaved) => {
    if (!data) {
      return;
    }

    const index = _.findIndex(this._items, (item: Unsaved) => {
      return item.id === data.id;
    });

    if (index === -1) {
      this._items.push(data);
    } else {
      this._items[index] = data;
    }

    // emitUnsavedIdsChanged([data.id]);
  };

  /**
   * Will remove an item matching the id provided.
   *
   * @param {string} id
   */
  remove = (id: string) => {
    const index = _.findIndex(this._items, (v: Unsaved) => v.id === id);

    if (index > -1) {
      this._items.splice(index, 1);

      // emitUnsavedIdsChanged([id]);
    }
  };

  /**
   * Will remove an item matching the id provided.
   *
   * @param {string[]} ids
   */
  removeIds = (ids: string[]) => {
    const out: string[] = [];

    for (const id of ids) {
      const index = _.findIndex(this._items, (v: Unsaved) => v.id === id);

      if (index > -1) {
        this._items.splice(index, 1);
        out.push(id);
      }
    }

    // emitUnsavedIdsChanged(out);
  };

  removeAll = () => {
    // const ids = this._items.map((v) => v.id);

    this._items = [];

    // emitUnsavedIdsChanged(ids);
  };

  /**
   * Convenience function for changing urls.
   *
   * @param {string} url
   */
  changeUrl = (url: string) => {
    this.processAll(() => {
      if(!_.isUndefined(window)) {
        window.location.href = url;
      }
    });
  };

  /**
   * Convenience function for activating the history back on the browser.
   */
  historyBack = () => {
    this.processAll(() => {
      if(!_.isUndefined(window)) {
        window.history.back();
      }
    });
  };

  confirm = (data: Unsaved, confirm: () => void, cancel: () => void) => {
    emitter.emitShowConfirmationDialog({
      title: 'Unsaved changes',
      text: data.message,
      okText: 'Continue',
      cancelText: 'Let me save.',
      onClickOk: confirm,
      onClickCancel: cancel,
    });
  };

  /**
   * Will process the change in the main items list.
   *
   * @param {Function} fn - function that is called if nothing needs to be saved.
   * @param message - A message to show on the modal if none is provided
   */
  processAll = (fn: () => void, message = confirmationMessage) => {
    const len = this._items.length;

    if (len === 0) {
      if (_.isFunction(fn)) {
        fn();
      }
    } else {
      const item = this._items[0];

      const data: Unsaved = item;

      data.message = item?.message || message;
      const confirm = () => {
        this.removeAll();

        if (_.isFunction(data.confirm)) {
          data.confirm();
        }

        if (_.isFunction(fn)) {
          fn();
        }
      };

      this.confirm(data, confirm, data.cancel);
    }
  };

  /**
   * Gets the first item with an Id.
   *
   * @param {string} id
   * @returns {Unsaved}
   */
  getId = (id: string): Unsaved => {
    const index = _.findIndex(this._items, (v) => v.id === id);

    if (index > -1) {
      return this._items[index];
    }

    return null;
  };

  /**
   * Will process the first item found with the id in the list.
   *
   * @param {string} id
   * @param {Function} fn
   * @param {string} message
   */
  processId = (id: string, fn: () => void, message = confirmationMessage) => {
    const item = this.getId(id);

    if (item) {
      if (_.isFunction(fn)) {
        fn();
      }
    } else {
      item.message = item?.message || message;

      const confirm = () => {
        this.remove(item.id);

        if (_.isFunction(item.confirm)) {
          item.confirm();
        }

        if (_.isFunction(fn)) {
          fn();
        }
      };

      this.confirm(item, confirm, item.cancel);
    }
  };

  /**
   * Will process the first item found with the id in the list.
   *
   * @param {string[]} ids
   * @param {Function} fn
   * @param {string} message
   */
  processIds = (
    ids: string[],
    fn: () => void,
    message = confirmationMessage,
  ) => {
    for (const id of ids) {
      const item = this.getId(id);

      if (!item) {
        item.message = item?.message || message;

        const confirm = () => {
          if (_.isFunction(item.confirm)) {
            item.confirm();
          }

          if (_.isFunction(fn)) {
            fn();
          }
        };

        this.confirm(item, confirm, item.cancel);

        return;
      }
    }
  };

  /**
   * Allows you to find out if there are pending changes.
   *
   * @param {string} id
   * @returns {boolean}
   */
  hasChanges = (id?: string): boolean => {
    if (id) {
      return this._items.length > 0;
    }

    const item = this.getId(id);

    return !item;
  };

  get items(): Unsaved[] {
    return this._items;
  }
}

export default new UnsavedStore();
