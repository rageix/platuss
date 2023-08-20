'use client';
import FormController from '@/lib/formController/FormController';
import Joi from 'joi';
import { ChangeEvent } from 'react';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/lib/backendResponse';

interface Form {
  email: string;
  password: string;
  rememberMe: boolean;
}

const defaultForm: Form = {
  email: '',
  password: '',
  rememberMe: true,
};

export default class Controller extends FormController<Form> {
  defaultForm = defaultForm;
  formSchema = Joi.object<Form>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
    password: Joi.string().alphanum().min(1).required().label('Password'),
    rememberMe: Joi.boolean().required().label('Remember Me'),
  });

  onSubmit = async () => {
    const response = await postData<Form, never>('/api/login', this.form);

    if (response.type === ResponseType.Ok) {
      await this.queryClient.invalidateQueries({
        queryKey: ['/api/currentUser'],
      });
      this.router.push('/');
    }
  };

  onChangeEmail = (arg: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ ...this.form, email: arg.target.value });
  };

  onChangePassword = (arg: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ ...this.form, password: arg.target.value });
  };

  onChangeRememberMe = () => {
    this.onChangeForm({ ...this.form, rememberMe: !this.form.rememberMe });
  };
}
