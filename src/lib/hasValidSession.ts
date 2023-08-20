import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { decrypt } from "@/lib/crytpo";
import { Session } from "@/lib/session";

export function hasValidSession(
  cookies: ReadonlyRequestCookies | RequestCookies,
): boolean {

  const cookie: RequestCookie = cookies.get(process.env.SESSION_COOKIE_NAME);

  if (!cookie) {
    return false;
  }

  const session = decrypt<Session>(cookie.value, process.env.SESSION_SECRET);

  return new Date(session.expires) >= new Date();

}