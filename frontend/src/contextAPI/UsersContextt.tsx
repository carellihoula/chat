import React, { createContext, useState, useContext, ReactNode } from "react";

export interface User {
  id: number;
  email: string;
  profileImage: string;
  name: string;
  status: string | null;
  active: boolean;
  password: string;
  role: string;
}

interface UsersContextType {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
  userSelected: User | null;
  setUserSelected: React.Dispatch<React.SetStateAction<User | null>>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [userSelected, setUserSelected] = useState<User | null>(null);

  return (
    <UsersContext.Provider
      value={{ userInfo, setUserInfo, userSelected, setUserSelected }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
