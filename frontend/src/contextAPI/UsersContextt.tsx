import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getAllUsers } from "../api/API";
//import { getIdCurrentUser } from "../../utils/getIdCurrentUser";

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
  usersList: User[];
  setUsersList: React.Dispatch<React.SetStateAction<User[]>>;
  userSelected: User | null;
  setUserSelected: React.Dispatch<React.SetStateAction<User | null>>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  useEffect(() => {
    const getFriends = async () => {
      const res = await getAllUsers("/users", token);
      if (res && res.length > 0) {
        setUsersList(res);
      }
    };
    getFriends();
  }, [token]);

  /*useEffect(() => {
    if (usersList.length > 0) {
      const currentUserID = getIdCurrentUser(token as string);
      const defaultUser =
        usersList.find((user) => user.id !== currentUserID) || usersList[0];
      setUserSelected(defaultUser);
    }
  }, [usersList, token]);

  console.log(usersList);*/

  return (
    <UsersContext.Provider
      value={{
        userInfo,
        setUserInfo,
        userSelected,
        setUserSelected,
        usersList,
        setUsersList,
      }}
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
