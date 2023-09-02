import { getData } from '@/lib/requests';
import { newTag, Tag } from '@/types/tag';
import { ApiTagsGet } from '@/app/api/tags/route';

export async function getTags(query: ApiTagsGet): Promise<Tag[] | undefined> {
  if (query.id === 'new') {
    return [newTag()];
  }

  const response = await getData<Tag[]>('/api/tags', {
    q: JSON.stringify(query),
  });

  return response.data;
}
