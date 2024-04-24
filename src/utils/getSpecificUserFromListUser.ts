//import { User } from "../contextAPI/UsersContextt.tsx";

import { User } from "../types_interfaces";

export const getSpecificUser = async (
  usersPromise: Promise<User[]>,
  userId: number
): Promise<User> => {
  const usersList = await usersPromise;
  const user = usersList.find((user) => user.id === userId);
  if (!user) {
    throw new Error(`Utilisateur avec  f l'ID ${userId} non trouvé.`);
  }
  return user;
};
