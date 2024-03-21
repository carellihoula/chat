import { User } from "../contextAPI/UsersContextt.tsx";

export const getSpecificUser = (usersList: User[], userId: number): User => {
  const user = usersList.find((user) => user.id === userId);
  if (!user) {
    throw new Error(`Utilisateur avec l'ID ${userId} non trouvé.`);
  }
  return user;
};
