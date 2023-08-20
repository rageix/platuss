import { getUserFromSession } from "@/lib/getUserFromSession";
import { cookies } from "next/headers";
import { userIsActive } from "@/lib/user";

/**
 * Returns if a user is logged in;
 */
export async function userIsLoggedIn(): Promise<boolean> {
  const user = await getUserFromSession(cookies());
  return userIsActive(user);
}