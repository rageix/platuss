'use client';
import { ColumnDef, createColumnHelper, } from '@tanstack/react-table'
import { Tag } from "@/types/tag";
import Checkbox from "@/components/checkbox/Checkbox";
import Link from "next/link";
import Table from "@/components/table/Table";

const defaultData: Tag[] = [
  {
    id: '1',
    userId: '1',
    name: 'tag 1',
    color: '#006400',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    name: 'tag 2',
    color: '#00008B',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '34',
    userId: '1',
    name: 'tag 2',
    color: '#9400D3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const columnHelper = createColumnHelper<Tag>();

const columns: ColumnDef<Tag, any>[] = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          // indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({row}) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          // indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  columnHelper.accessor('name', {
    id: 'name',
    header: () => 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => row.color, {
    id: 'color',
    header: () => <span>Color</span>,
    cell: info => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('updatedAt', {
    id: 'updatedAt',
    header: () => 'UpdatedAt',
    cell: ({row}) => <span>{row.original.updatedAt.toLocaleDateString()}</span>,
  }),
  {
    id: 'edit',
    header: () => null,
    cell: ({row}) => (
      <Link
        href={`/dashboard/tags/${row.original.id}`}
        className="text-indigo-600 hover:text-indigo-900"
      >
        Edit<span className="sr-only">, {row.original.name}</span>
      </Link>
    ),
  },
]

export default function Page() {

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1
            className="text-base font-semibold leading-6 text-gray-900">Tags</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the tags in your account.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add tag
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <Table defaultData={defaultData}
                   columns={columns}
                   dataFetchFn={() => []}/>
          </div>
        </div>
      </div>
    </div>
  )
}