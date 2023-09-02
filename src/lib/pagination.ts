import { Pagination } from '@/types/pagination';

export function makePagination(arg: Pagination): Required<Pagination> {
  return {
    pageSize: arg.pageSize ? arg.pageSize : 0,
    pageIndex: arg.pageIndex ? arg.pageIndex : 10,
  };
}
