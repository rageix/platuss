import _ from 'lodash';
import { ZodIssue } from 'zod';

export interface FormError {
  path: string;
  errors: string[];
}

export interface FormState {
  editable: boolean;
  errors: ZodIssue[];
  key: string;
}

export function newFormState(): FormState {
  return {
    editable: true,
    errors: [],
    key: _.uniqueId('form_'),
  };
}
