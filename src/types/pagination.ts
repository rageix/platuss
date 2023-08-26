import Joi from "joi";

export interface PaginatedRequest {
  page: number,
  perPage: number
}

export interface PaginatedResponse<T> {
  data: T,
  page: number,
  perPage: number
}

export const paginationSchema = {
  page: Joi.number().integer().allow(null).optional().default(0),
  perPage: Joi.number().integer().allow(null).optional().default(10),
};