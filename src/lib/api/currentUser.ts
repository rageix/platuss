import { getData } from "@/lib/requests";
import { User } from "@/lib/user";

export async function getCurrentUser(): Promise<User> {
  const response = await getData<User>('/api/currentUser');

  return response.data;

}