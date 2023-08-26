import db from './db';
import { User } from '@/types/user';
import {
  ReadonlyRequestCookies
} from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { getSession } from '@/lib/getSession';
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export async function getUserFromSession(
  cookies: ReadonlyRequestCookies | RequestCookies,
): Promise<User> {
  const session = getSession(cookies);

  if (!session.userId) {
    return null;
  }

  const user = await db.users.findUnique({where: {id: session.userId}});

  return user?.active ? user : null;
}
