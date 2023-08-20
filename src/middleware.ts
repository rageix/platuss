import csrf from 'edge-csrf';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { hasValidSession } from "@/lib/hasValidSession";

const csrfProtect = csrf({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // if(request.cookies.get(process.env.SESSION_COOKIE_NAME) &&
  //   !hasValidSession(request.cookies)) {
  //
  //   response.cookies.delete(process.env.SESSION_COOKIE_NAME);
  //
  // }

  // csrf protection
  const csrfError = await csrfProtect(request, response);

  // check result
  if (csrfError) {
    return new NextResponse('invalid csrf token', { status: 403 });
  }

  return response;
}