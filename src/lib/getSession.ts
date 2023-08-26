import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { decrypt } from '@/lib/crytpo';
import { defaultSession, Session } from '@/lib/session';
import _ from 'lodash';
/**
 * Can be called in page/layout server component.
 * @param cookies NextRequest
 * @returns Session or null
 */
export function getSession(
  cookies: ReadonlyRequestCookies | RequestCookies,
): Session {
  const cookie = cookies.get(_.toString(process.env.SESSION_COOKIE_NAME));

  if (!cookie) {
    return defaultSession;
  }

  const session = decrypt<Session>(
    cookie.value,
    _.toString(process.env.SESSION_SECRET),
  );

  return { ...defaultSession, ...session };
}
