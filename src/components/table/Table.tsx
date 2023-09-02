import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import PageNumberInput from '@/components/table/PageNumberInput';
import TableNavButton from '@/components/table/TableNavButton';

interface Props<T> {
  data: T[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  rowSelection: {};
  setRowSelection: Dispatch<SetStateAction<{}>>;
  columns: ColumnDef<T, any>[];
  dataFetchFn: () => T[];
}

export default function Table<T>(props: Props<T>) {
  const table = useReactTable<T>({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    // pageCount: dataQuery.data?.pageCount ?? -1,
    // pageCount: 5,
    state: {
      pagination: props.pagination,
      rowSelection: props.rowSelection,
    },
    enableRowSelection: true, //enable row selection for all rows
    onRowSelectionChange: props.setRowSelection,
    onPaginationChange: props.setPagination,
    manualPagination: true,
    debugTable: true,
  });

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
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
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of{' '}
            <span className="font-medium">20</span> results
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
