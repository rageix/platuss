import { getData } from '@/lib/requests';
import { User } from '@/types/user';

export async function getCurrentUser(): Promise<User | undefined> {
  const response = await getData<User>('/api/currentUser');

  return response.data;
}
