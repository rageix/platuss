import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/currentUser";

export function useUser(user?: User) {
  return useQuery({
    queryKey: ['/api/currentUser'],
    queryFn: getCurrentUser,
    initialData: user,
  });
}