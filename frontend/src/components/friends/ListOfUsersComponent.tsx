import React, { FC, useEffect, useState } from "react";
import { getAllUsers } from "../../api/API.ts";
import { User, useUsers } from "../../contextAPI/UsersContextt.tsx";
import { UserComponent } from "./UserComponent.tsx";
import styles from "./users.module.css";
import { getIdCurrentUser } from "../../../utils/getIdCurrentUser.ts";
import { listMenuItems } from "../../sidebar/LeftSidebar/listMenuItems.ts";
import { useMessages } from "../../contextAPI/MessagesContext.tsx";
import default__img from "../../assets/images/default__image.jpg";
//import { useMessages } from "../../contextAPI/MessagesContext";

interface Props {
  hiddenProfile: React.MouseEventHandler<HTMLDivElement>;
}

export const ListOfUsersComponent: FC<Props> = () => {
  const token = localStorage.getItem("token");
  const { userSelected, setUserSelected, setUsersList } = useUsers();
  const [friends, setFriends] = useState<User[]>([]);
  const { selectedMenuItem, setSelectedMenuItem } = useMessages();
  useEffect(() => {
    const getFriends = async () => {
      const res = await getAllUsers("/users", token);
      if (res) {
        setFriends(res);
        setUsersList(res);
      }
    };
    getFriends();
  }, [token, selectedMenuItem, setUsersList]);

  const selectedUserHandleClick = (item: User) => {
    setUserSelected(item);
    setSelectedMenuItem(listMenuItems[0]);
  };
  console.log(userSelected);
  const listFiltered = friends.filter(
    (friend) => friend.id !== getIdCurrentUser(token as string)
  );
  return (
    <div className={styles.list__users__div}>
      {listFiltered?.map((user: User, index: number) => {
        return (
          <div key={index}>
            <UserComponent
              name={user.name}
              profil={user.profileImage || default__img}
              key={index}
              bg="#2f3136"
              isSelected={true}
              handleClick={() => selectedUserHandleClick(user)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListOfUsersComponent;
