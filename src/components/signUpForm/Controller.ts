import FormController from '@/lib/formController/FormController';
import Joi from 'joi';
import { ChangeEvent } from 'react';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/lib/backendResponse';

interface Form {
  email: string;
  password: string;
  passwordAgain: string;
  terms: boolean
}

const defaultForm: Form = {
  email: '',
  password: '',
  passwordAgain: '',
  terms: false
};

interface PostRequest {
  email: string;
  password: string;
}

export default class Controller extends FormController<Form> {
  defaultForm = defaultForm;
  formSchema = Joi.object<Form>({
    email: Joi.string().trim().email({ tlds: { allow: false } }).required().label("Email"),
    password: Joi.string().trim().alphanum().min(1).required().label("Password"),
    passwordAgain: Joi.string()
      .trim()
      .alphanum()
      .min(1)
      .required()
      .label("Password (Again)")
      .valid(Joi.ref('password')).messages({
        "any.only": '{#label} does not match "Password"',
      }),
    terms: Joi.boolean().invalid(false).required().messages({
      "*": 'You must accept the terms of service before continuing',
    }),
  });

  onSubmit = async () => {
    const response = await postData<PostRequest, never>(
      '/api/signUp',
      this.form,
    );

    if (response.type === ResponseType.Ok) {
      window.location.href = '/';
    }
  };

  onChangeEmail = (arg: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ ...this.form, email: arg.target.value });
  };

  onChangePassword = (arg: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ ...this.form, password: arg.target.value });
  };

  onChangePasswordAgain = (arg: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ ...this.form, passwordAgain: arg.target.value });
  };

  onChangeTerms = () => {
    this.onChangeForm({ ...this.form, terms: !this.form.terms });
  }
}
