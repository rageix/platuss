'use client';
import FormErrors from '../formError/FormErrors';
import Input from '../input/Input';
import PrimaryButton from '../buttons/PrimaryButton';
import FormLabel from '@/components/formLabel/FormLabel';
import Former, { ValidateFn } from '@rageix/former';
import { postData, putData } from '@/lib/requests';
import { ResponseType } from '@/types/backendResponse';
import { usePathname } from 'next/navigation';
import { z } from 'zod';
import { getZodErrors } from '@/lib/getZodErrors';
import { zCssColorValidator, zMinMessage } from '@/lib/validation';
import { useEffect } from 'react';
import { Tag } from '@/types/tag';
import { ApiTagsPost, ApiTagsPut } from '@/app/api/tags/route';
import { getTags } from '@/lib/api/tags';
import { useQuery } from '@tanstack/react-query';

interface Form extends Partial<Tag> {
  id: string;
  name: string;
  color: string;
}

const form = new Former<Form>({
  defaultValues: {
    id: '',
    name: '',
    color: '',
  },
});

const nameValidator: ValidateFn = (value) =>
  getZodErrors(z.string().min(1, zMinMessage).safeParse(value));

const colorValidator: ValidateFn = (value) =>
  getZodErrors(zCssColorValidator.safeParse(value));

interface Props {
  id?: string;
  onCreate: (id: string) => void;
}

export default function TagForm(props: Props) {
  const path = usePathname();
  const { data } = useQuery({
    queryKey: ['tags', props.id],
    queryFn: () => getTags({ id: props.id }),
    refetchOnWindowFocus: false,
  });

  form.useForm(async (values) => {
    if (values.id === '') {
      const response = await postData<ApiTagsPost, Tag>('/api/tags', values);

      if (response.type === ResponseType.Data) {
        if (response.data) {
          console.log('has response data');
          props.onCreate(response.data.id);
          form.setValues(response.data);
        }
      }

      return;
    }

    await putData<ApiTagsPut, never>('/api/tags', values);
  });

  useEffect(() => {
    form.reset();
  }, [path]);

  useEffect(() => {
    if (data) {
      form.setValues(data.data[0]);
    }
  }, [data]);

  return (
    <form
      className="space-y-6"
      data-testid="tagForm"
      {...form.getFormProps()}
    >
      <form.Field
        name="name"
        validate={nameValidator}
        children={(field) => (
          <div>
            <FormLabel htmlFor="name">Name</FormLabel>
            <div className="mt-2">
              <Input
                id="name"
                name="name"
                data-testid="name"
                aria-describedby="nameErrors"
                aria-invalid={field.hasErrors()}
                {...field.getValueProps()}
              />
            </div>
            <FormErrors
              errors={field.state.errors}
              id="nameErrors"
              data-testid="nameErrors"
            />
          </div>
        )}
      />
      <form.Field
        name="color"
        validate={colorValidator}
        children={(field) => (
          <div>
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="color">Color</FormLabel>
            </div>
            <div className="mt-2">
              <Input
                id="color"
                name="color"
                data-testid="color"
                type="text"
                aria-describedby="colorErrors"
                aria-invalid={field.hasErrors()}
                {...field.getValueProps()}
              />
            </div>
            <FormErrors
              errors={field.state.errors}
              id="colorErrors"
              data-testid="colorErrors"
            />
          </div>
        )}
      />
      <div>
        <PrimaryButton
          type="submit"
          className="w-full"
          disabled={!form.valid}
          data-testid="submitButton"
        >
          {props.id === 'new' ? 'Create' : 'Update'}
        </PrimaryButton>
      </div>
    </form>
  );
}
