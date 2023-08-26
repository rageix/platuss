export interface User {
  id: string,
  active: boolean,
  email: string,
  emailVerified: boolean,
  firstName: string,
  lastName: string,
  image: string,
  created?: Date,
  updated?: Date
}