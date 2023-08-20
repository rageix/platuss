import emitter, { emitterMessage } from '../emitter';
// import unsavedStore, {
//   Unsaved,
// } from '@/stores/unsavedStore/unsavedStore';
import { FormState, newFormState } from './state';
import { ComponentController } from '../componentController';
import { ObjectSchema } from 'joi';
import { Dispatch, SetStateAction, useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default class FormController<T> extends ComponentController<FormState> {
  defaultState = newFormState();
  // unsavedData: Unsaved;
  form: T;
  defaultForm: T;
  updateForm: Dispatch<SetStateAction<T>>;
  formSchema: ObjectSchema<T>;
  submit = false;
  params: Params;

  onRender = () => {
    [this.state, this.updateState] = useState<FormState>(this.defaultState);
    [this.form, this.updateForm] = useState<T>(this.defaultForm);
    this.router = useRouter();
    this.queryClient = useQueryClient();
    this.params = useParams();
  };

  reset = () => {
    this.submit = false;
    this.updateState(this.defaultState);
    this.updateForm(this.defaultForm);
  }

  setForm = (form: T) => {
    this.updateForm(form);
  };

  setup = () => {
    emitter.on(
      emitterMessage.currentUserUpdated,
      this.onEventCurrentUserUpdated,
    );
  };

  teardown = () => {
    emitter.off(
      emitterMessage.currentUserUpdated,
      this.onEventCurrentUserUpdated,
    );
  };

  /**
   * Some automatic handing for when a user is updated for showing delete icons and such.
   */
  onEventCurrentUserUpdated = () => {
    // let state: State = { ...this.state };
    // this.state = state;
  };

  /**
   * Should be called after field change.
   */
  onChangeForm = (form: T, validate = true) => {
    // if (this.unsavedData) {
    //   unsavedStore.set(this.unsavedData);
    // }

    this.setForm(form);

    if (validate && this.submit) {
      return this.onValidateForm(form);
    }
  };

  /**
   * Should be called when you want to validate the form.
   * @returns {boolean}
   */
  onValidate = (): boolean => {
    if (this.submit) {
      return this.onValidateForm(this.form);
    }

    return false;
  };

  /**
   * Call when you want to submit a form.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.onClickSubmit();
  };

  /**
   * For use when clicking a submit button.
   */
  onClickSubmit = () => {
    this.submit = true;

    if (this.onValidateForm(this.form)) {
      this.onSubmit();
    }
  };

  /**
   * This is a blank placeholder function which all child controllers should have.
   * @param args
   */
  onSubmit = (...args: unknown[]): void => {
    console.log(args);
  };

  /**
   * Another placeholder function that all children should have,
   * put actual form validation code in this method.
   *
   * @returns {boolean}
   */
  onValidateForm = (form: T): boolean => {

    console.log(form);

    const result = this.formSchema.validate(form, {
      abortEarly: false,
      allowUnknown: true,
      // errors: {
      //   label: false,
      // },
    });

    const state: FormState = { ...this.state };

    if (result.error) {
      state.errors = result.error.details;
    } else {
      state.errors = [];
    }

    this.setState(state);

    return state.errors.length === 0;
  };

  /***
   * When the form is saved do stuff like remove any page change block.
   */
  onSaveSuccess = () => {
    // if (this.unsavedData) {
    //   unsavedStore.remove(this.unsavedData.id);
    // }
  };
}
