import _ from 'lodash';
import { ValidationErrorItem } from "joi";

export interface FormError {
  path: string,
  errors: string[]
}

export interface FormState {
    editable: boolean,
    errors: ValidationErrorItem[],
    admin?: number,
    key: string,
}

export function newFormState(): FormState {

    return {
        editable: true,
        errors: [],
        key: _.uniqueId('form_')
    }

}
