import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/crytpo';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { defaultCookie, Session } from '@/lib/session';
import _ from 'lodash';
/**
 * Can be called in page/layout server component.
 * @returns NextResponse
 * @param {NextResponse} response
 * @param {Partial<Session>}session
 * @param {Partial<ResponseCookie>} cookie
 * @return NextResponse
 */
export function setSession(
  response: NextResponse,
  session: Partial<Session>,
  cookie: Partial<ResponseCookie>,
): NextResponse {
  const encrypted = encrypt(session, _.toString(process.env.SESSION_SECRET));

  response.cookies.set(_.toString(process.env.SESSION_COOKIE_NAME), encrypted, {
    ...defaultCookie,
    ...cookie,
  });

  return response;
}
