import respond from '@/lib/response/respond';
import { NextRequest } from "next/server";
import { getUserFromSession } from "@/lib/getUserFromSession";
import { User } from "@/lib/user";

export async function GET(req: NextRequest) {

  try {

    const user = await getUserFromSession(req.cookies);
    return respond.withData<User>(user);

  } catch (error) {
    return respond.withServerError(req, error);
  }
}
