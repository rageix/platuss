import respond from '@/lib/respond';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = respond.withOk();

    response.cookies.delete(process.env.SESSION_COOKIE_NAME as string);
    return response;
  } catch (error) {
    return respond.withServerError(req, error);
  }
}
