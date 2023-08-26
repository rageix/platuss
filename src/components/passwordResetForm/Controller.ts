'use client';
import FormController from '@/lib/formController/FormController';
import { ChangeEvent } from 'react';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/types/backendResponse';
import { z } from 'zod';
import { ApiPasswordResetPost } from '@/app/api/passwordReset/route';

interface Form {
  email: string;
}

const defaultForm: Form = {
  email: '',
};

export default class Controller extends FormController<Form> {
  defaultForm = defaultForm;
  formSchema = z.object({
    email: z.string().email(),
  });

  onSubmit = async () => {
    const response = await postData<ApiPasswordResetPost, never>(
      '/api/passwordReset',
      this.form,
    );

    if (response.type === ResponseType.Ok) {
      this.router.push('/passwordReset/checkEmail');
    }
  };

  onChangeEmail = (arg: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ ...this.form, email: arg.target.value });
  };
}
