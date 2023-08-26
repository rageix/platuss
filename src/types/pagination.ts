import z from 'zod';
import { BackendResponse } from '@/types/backendResponse';

export interface PaginatedResult extends BackendResponse<any> {}

export interface PaginatedResponse<T> {
  data: T;
  page: number;
  perPage: number;
}

export const paginationSchema = z.object({
  page: z.number().int().optional().default(0),
  perPage: z.number().int().optional().default(10),
});

export enum FilterDirection {
  LowToHigh = 0, // low to high
  HighToLow = 1, // high to low
}

export interface Sort {
  field: string;
  direction: FilterDirection;
}

export interface PaginatedResults<T> {
  results: T[];
  pagination: Pagination;
  sort?: Sort[];
}

export interface Pagination {
  page?: number;
  perPage?: number;
  offset?: number;
}

export function newPagination(): Pagination {
  return {
    page: 1,
    perPage: 25,
    offset: 25,
  };
}
