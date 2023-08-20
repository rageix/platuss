import Joi from 'joi';

export const paginationSchema = {
    page: Joi.number().integer().allow(null).optional().default(null),
    perPage: Joi.number().integer().allow(null).optional().default(null),
    offset: Joi.number().integer().allow(null).optional().default(null),
};

export enum FilterDirection {
  NotSet = null,
  LowToHigh = 0, // low to high
  HighToLow = 1, // high to low
}

export interface Sort {
  field: string;
  direction: FilterDirection;
}

export interface PaginatedResults<T> {
    results: T[],
    pagination: Pagination,
    sort?: Sort[],
}

export interface Pagination {
    page?: number,
    perPage?: number,
    offset?: number
}

export function newPagination(): Pagination {

    return {
        page: 1,
        perPage: 25,
        offset: 25
    }

}
