import { redirect } from 'next/navigation';
import { userIsLoggedIn } from '@/lib/userIsLoggedIn';

/**
 * Redirects to another path if user is logged in.
 * @param path
 */
export async function redirectIfLoggedIn(path: string): Promise<never | null> {
  return (await userIsLoggedIn()) ? redirect(path) : null;
}

export async function redirectIfNotLoggedIn(
  path: string,
): Promise<never | null> {
  return !(await userIsLoggedIn()) ? redirect(path) : null;
}
