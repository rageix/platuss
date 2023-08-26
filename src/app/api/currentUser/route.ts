import respond from '@/lib/respond';
import { NextRequest } from 'next/server';
import { getUserFromSession } from '@/lib/getUserFromSession';
import { User } from '@/types/user';

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromSession(req.cookies);
    return respond.withData<User | null>(user);
  } catch (error) {
    return respond.withServerError(req, error);
  }
}
