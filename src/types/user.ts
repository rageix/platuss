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

/**
 * Determines if a user is active
 * @param user
 * @return boolean
 */
export function userIsActive(user: User): boolean {

  return user?.active;

}