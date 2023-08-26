import FormController from '@/lib/formController/FormController';
import { ChangeEvent } from 'react';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/types/backendResponse';
import { z } from 'zod';
import { ApiPasswordResetIdPost } from '@/app/api/passwordReset/id/route';
import { zMinMessage } from '@/lib/validation';

interface Form {
  password: string;
  passwordAgain: string;
}

const defaultForm: Form = {
  password: '',
  passwordAgain: '',
};

export default class Controller extends FormController<Form> {
  defaultForm = defaultForm;
  formSchema = z
    .object({
      password: z.string().trim().min(1, { message: zMinMessage }),
      passwordAgain: z.string().trim().min(1, { message: zMinMessage }),
    })
    .refine((val) => val.password === val.passwordAgain, {
      path: ['passwordAgain'],
      message: 'Password (Again) must match Password',
    });

  onSubmit = async () => {
    const response = await postData<ApiPasswordResetIdPost, never>(
      '/api/passwordReset/id',
      {
        password: this.form.password,
        id: this.params?.id,
      },
    );

    if (response.type === ResponseType.Ok) {
      window.location.href = '/passwordReset/success';
    }
  };

  onChangePassword = (arg: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ ...this.form, password: arg.target.value });
  };

  onChangePasswordAgain = (arg: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ ...this.form, passwordAgain: arg.target.value });
  };
}
