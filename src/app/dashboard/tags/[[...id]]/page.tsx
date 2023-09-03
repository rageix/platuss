'use client';
import {
  ColumnDef,
  createColumnHelper,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { Tag } from '@/types/tag';
import Checkbox from '@/components/checkbox/Checkbox';
import Link from 'next/link';
import Table from '@/components/table/Table';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTags, getTags } from '@/lib/api/tags';
import { useParams, useRouter } from 'next/navigation';
import FormDialog from '@/components/formDialog/FormDialog';
import TagForm from '@/components/tagForm/TagForm';
import _ from 'lodash';
import emitter from '@/lib/emitter';

const columnHelper = createColumnHelper<Tag>();

const columns: ColumnDef<Tag, any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          // indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
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
    cell: (info) => info.getValue(),
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.color, {
    id: 'color',
    header: () => <span>Color</span>,
    cell: (info) => <span>{info.getValue()}</span>,
    enableSorting: false,
  }),
  columnHelper.accessor('updatedAt', {
    id: 'updatedAt',
    header: () => 'UpdatedAt',
    cell: ({ row }) => <span>{row.original.updatedAt?.toString()}</span>,
  }),
  {
    id: 'edit',
    header: () => null,
    cell: ({ row }) => (
      <Link
        href={`/dashboard/tags/${row.original.id}`}
        className="text-indigo-600 hover:text-indigo-900"
      >
        Edit<span className="sr-only">, {row.original.name}</span>
      </Link>
    ),
  },
];

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  let id: string = '';
  if (params.id) {
    id = params.id[0];
  }
  const [show, setShow] = useState(!!params.id);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'updatedAt',
      desc: true,
    },
  ]);
  const [count, setCount] = useState(1);
  const { data } = useQuery({
    queryKey: ['tags', pagination.pageIndex, pagination.pageSize, id, sorting],
    queryFn: () => getTags({ ...pagination }),
  });

  useEffect(() => {
    setShow(!!params.id);
  }, [params.id]);

  useEffect(() => {
    setPagination({
      pageIndex: data?.pageIndex || 0,
      pageSize: data?.pageSize || 10,
    });
  }, [data?.pageIndex, data?.pageSize]);

  useEffect(() => {
    setCount(data?.count || 1);
  }, [data?.count]);

  async function deleteSelected() {
    let ids: string[] = Object.keys(rowSelection).map(
      (v) => data?.data[_.toNumber(v)].id as string,
    );

    await deleteTags(ids);
    await queryClient.invalidateQueries({ queryKey: ['tags'] });
    setRowSelection({});
  }

  async function onClickDelete() {
    emitter.emitShowConfirmationDialog({
      text: 'Are you sure you want to delete these tags?',
      onClickOk: deleteSelected,
    });
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Tags
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the tags in your account.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => router.push('/dashboard/tags/new')}
          >
            Add tag
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <Table
              data={data?.data || []}
              pagination={pagination}
              setPagination={setPagination}
              sorting={sorting}
              setSorting={setSorting}
              columns={columns}
              dataFetchFn={() => []}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              onClickDelete={onClickDelete}
              count={count}
            />
          </div>
        </div>
      </div>
      <FormDialog
        title={id === 'new' ? 'Create Tag' : 'Edit Tag'}
        show={show}
        onHide={() => router.push('/dashboard/tags')}
      >
        <TagForm
          id={id}
          onCreate={(id) => {
            router.push(`/dashboard/tags/${id}`);
          }}
        />
      </FormDialog>
    </div>
  );
}
