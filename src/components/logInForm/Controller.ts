'use client';
import FormController from '@/lib/formController/FormController';
import { ChangeEvent } from 'react';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/types/backendResponse';
import { z } from 'zod';
import { ApiLoginPost } from '@/app/api/login/route';
import { zMinMessage } from '@/lib/validation';

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
  formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: zMinMessage }),
    rememberMe: z.boolean(),
  });

  onSubmit = async () => {
    const response = await postData<ApiLoginPost, never>(
      '/api/login',
      this.form,
    );

    if (response.type === ResponseType.Ok) {
      // await this.queryClient.invalidateQueries({
      //   queryKey: ['/api/currentUser'],
      // });
      this.router.push('/dashboard');
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
