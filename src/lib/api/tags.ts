import { deleteData, getData } from '@/lib/requests';
import { newTag, Tag } from '@/types/tag';
import { ApiTagsGet } from '@/app/api/tags/route';
import { PaginatedResponse } from '@/types/pagination';
import { DeleteReq } from '@/types/deleteRequest';

export async function getTags(
  query: ApiTagsGet,
): Promise<PaginatedResponse<Tag[]> | undefined> {
  if (query.id === 'new') {
    return { data: [newTag()], pageIndex: 0, pageSize: 10 };
  }

  const response = await getData<PaginatedResponse<Tag[]>>('/api/tags', {
    q: JSON.stringify(query),
  });

  return response.data;
}

export async function deleteTags(
  ids: string[],
): Promise<PaginatedResponse<Tag[]> | undefined> {
  const response = await deleteData<DeleteReq, never>('/api/tags', {
    ids: ids,
  });

  return response.data;
}
