import { BaseValidationOptions } from "joi";

export const JoiSettings: BaseValidationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
}