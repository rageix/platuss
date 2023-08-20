import db from './db';
import { User } from '@/lib/user';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { getSession } from '@/lib/getSession';
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export async function getUserFromSession(
  cookies: ReadonlyRequestCookies | RequestCookies,
): Promise<User> {
  const session = getSession(cookies);

  if (!session.userId) {
    return null;
  }

  return db.users.findUnique({ where: { id: session.userId } });
}
