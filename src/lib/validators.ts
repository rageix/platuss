import Joi from "joi";

export const uuidValidator = Joi.string()
  .trim()
  .guid({ version: ["uuidv4"] });