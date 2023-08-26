import { getUserFromSession } from "@/lib/getUserFromSession";
import { cookies } from "next/headers";

/**
 * Returns if a user is logged in;
 */
export async function userIsLoggedIn(): Promise<boolean> {
  const user = await getUserFromSession(cookies());
  return !!user;
}