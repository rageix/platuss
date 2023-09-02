import z from 'zod';
import { BackendResponse } from '@/types/backendResponse';

export interface PaginatedResult extends BackendResponse<any> {}

export interface PaginatedResponse<T> {
  data: T;
  pageIndex: number;
  pageSize: number;
}

export const paginationSchema = z.object({
  pageIndex: z.number().int().optional(),
  pageSize: z.number().int().optional(),
});

export type Pagination = z.infer<typeof paginationSchema>;

export enum FilterDirection {
  LowToHigh = 0, // low to high
  HighToLow = 1, // high to low
}

export interface Sort {
  field: string;
  direction: FilterDirection;
}
