'use client';
import FormController from '@/lib/formController/FormController';
import Joi from 'joi';
import { ChangeEvent } from 'react';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/lib/backendResponse';

interface Form {
  email: string;
}

const defaultForm: Form = {
  email: '',
};

export default class Controller extends FormController<Form> {
  defaultForm = defaultForm;
  formSchema = Joi.object<Form>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
  });

  onSubmit = async () => {
    const response = await postData<Form, never>('/api/passwordReset', this.form);

    if (response.type === ResponseType.Ok) {
      this.router.push('/passwordReset/checkEmail');
    }
  };

  onChangeEmail = (arg: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ ...this.form, email: arg.target.value });
  };
}
