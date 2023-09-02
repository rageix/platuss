import { Pagination } from '@/types/pagination';

export function makePagination(arg: Pagination): Required<Pagination> {
  return {
    pageIndex: arg.pageIndex ? arg.pageIndex : 0,
    pageSize: arg.pageSize ? arg.pageSize : 10,
  };
}
