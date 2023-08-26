export interface User {
  id: string;
  active: boolean;
  email: string;
  emailVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  created?: Date;
  updated?: Date;
}
