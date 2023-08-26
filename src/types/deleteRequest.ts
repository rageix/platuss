import Joi, { ValidationResult } from "joi";
import { uuidValidator } from "@/lib/validators";
import { JoiSettings } from "@/lib/joi";

export interface DeleteRequest {
  ids: string[],
}

const deleteSchema = Joi.object<DeleteRequest>({
  ids: Joi.array().items(uuidValidator).required(),
});

export function validateDelete(arg: any): ValidationResult<DeleteRequest> {

  return deleteSchema.validate(arg, JoiSettings);

}

