// UsersContext.tsx
import React, { createContext, useState, useContext } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  about: string;
  isActif: boolean;
  createAt: Date;
  __v: number;
}

interface UsersContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  receiver: User | null;
  setReceiver: React.Dispatch<React.SetStateAction<User | null>>;
}

const UsersContext = createContext<UsersContextType>({} as UsersContextType);

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error(
      "useUsers doit être utilisé à l'intérieur d'un UsersProvider"
    );
  }
  return context;
};

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [receiver, setReceiver] = useState<User | null>(null);

  return (
    <UsersContext.Provider value={{ users, setUsers, receiver, setReceiver }}>
      {children}
    </UsersContext.Provider>
  );
};
