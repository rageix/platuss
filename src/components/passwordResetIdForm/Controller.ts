import FormController from '@/lib/formController/FormController';
import Joi from 'joi';
import { ChangeEvent } from 'react';
import { postData } from '@/lib/requests';
import { ResponseType } from '@/lib/backendResponse';

interface Form {
  password: string;
  passwordAgain: string;
}

const defaultForm: Form = {
  password: '',
  passwordAgain: '',
};

interface PostRequest {
  id: string;
  password: string;
}

export default class Controller extends FormController<Form> {
  defaultForm = defaultForm;
  formSchema = Joi.object<Form>({
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
  });

  onSubmit = async () => {
    const response = await postData<PostRequest, never>(
      '/api/passwordReset/id',
      {
        password: this.form.password,
        id: this.params.id
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
