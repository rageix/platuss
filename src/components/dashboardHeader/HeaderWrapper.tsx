import { User } from '@/types/user';
import Header from '@/components/header/Header';
import { getUserFromSession } from '@/lib/getUserFromSession';
import { cookies } from 'next/headers';

async function getCurrentUser(): Promise<User | null> {
  return getUserFromSession(cookies());
}

export default async function HeaderWrapper() {
  const user = await getCurrentUser();

  return <Header user={user} />;
}
