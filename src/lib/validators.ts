import Joi from "joi";

export const uuidValidator = Joi.string()
  .trim()
  .guid({ version: ["uuidv4"] });

export const passwordValidator = Joi.string().trim().min(1);