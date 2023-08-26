import FormController from '@/lib/formController/FormController';
import { ChangeEvent } from 'react';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/types/backendResponse';
import { z } from 'zod';
import { ApiSignUpPost } from '@/app/api/signUp/route';
import { zMinMessage } from '@/lib/validation';

interface Form {
  email: string;
  password: string;
  passwordAgain: string;
  terms: boolean;
}

const defaultForm: Form = {
  email: '',
  password: '',
  passwordAgain: '',
  terms: false,
};

export default class Controller extends FormController<Form> {
  defaultForm = defaultForm;
  formSchema = z
    .object({
      email: z.string().trim().email(),
      password: z.string().trim().min(1, { message: zMinMessage }),
      passwordAgain: z.string().trim().min(1, { message: zMinMessage }),
      terms: z.boolean().refine((val) => val, {
        message: 'You must accept the terms to create an account.',
      }),
    })
    .refine((val) => val.password === val.passwordAgain, {
      path: ['passwordAgain'],
      message: 'Password (Again) must match Password.',
    });

  onSubmit = async () => {
    const response = await postData<ApiSignUpPost, never>(
      '/api/signUp',
      this.form,
    );

    if (response.type === ResponseType.Ok) {
      this.router.push('/');
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
  };
}
