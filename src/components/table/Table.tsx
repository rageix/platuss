import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import PageNumberInput from '@/components/table/PageNumberInput';
import TableNavButton from '@/components/table/TableNavButton';
import DangerButton from '@/components/buttons/DangerButton';
import _ from 'lodash';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface Props<T> {
  data: T[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  rowSelection: {};
  setRowSelection: Dispatch<SetStateAction<{}>>;
  columns: ColumnDef<T, any>[];
  dataFetchFn: () => T[];
  onClickDelete?: () => void;
  count: number;
}

export default function Table<T>(props: Props<T>) {
  const table = useReactTable<T>({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: Math.ceil(props.count / props.pagination.pageSize),
    state: {
      pagination: props.pagination,
      rowSelection: props.rowSelection,
      sorting: props.sorting,
    },
    enableRowSelection: true, //enable row selection for all rows
    onRowSelectionChange: props.setRowSelection,
    onPaginationChange: props.setPagination,
    onSortingChange: props.setSorting,
    manualPagination: true,
    manualSorting: true,
  });

  const countStart = props.pagination.pageIndex * props.pagination.pageSize + 1;
  const countEnd = countStart + props.pagination.pageSize - 1;

  return (
    <>
      {props.onClickDelete && (
        <div>
          <DangerButton
            onClick={props.onClickDelete}
            disabled={_.isEmpty(props.rowSelection)}
          >
            Delete
          </DangerButton>
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'flex items-center cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                        {{
                          asc: (
                            <span className="ml-1">
                              <ChevronUpIcon className="h-4 w-4" />
                            </span>
                          ),
                          desc: (
                            <span className="ml-1">
                              <ChevronDownIcon className="h-4 w-4" />
                            </span>
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{countStart}</span>
            &nbsp;to{' '}
            <span className="font-medium">
              {Math.min(countEnd, props.count)}
            </span>{' '}
            of&nbsp;
            <span className="font-medium">{props.count}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <TableNavButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </TableNavButton>
          <div className="mx-3">
            <label
              htmlFor="page"
              className="sr-only"
            >
              Page
            </label>
            <PageNumberInput
              value={props.pagination.pageIndex}
              onChange={table.setPageIndex}
            />
          </div>
          <TableNavButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </TableNavButton>
        </div>
      </nav>
    </>
  );
}
