import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { decrypt } from '@/lib/crytpo';
import { Session } from '@/lib/session';
import _ from 'lodash';

export function hasValidSession(
  cookies: ReadonlyRequestCookies | RequestCookies,
): boolean {
  const cookie: RequestCookie | undefined = cookies.get(
    _.toString(process.env.SESSION_COOKIE_NAME),
  );

  if (!cookie) {
    return false;
  }

  const session = decrypt<Session>(
    cookie.value,
    _.toString(process.env.SESSION_SECRET),
  );

  return !_.isEmpty(session.userId);
}
