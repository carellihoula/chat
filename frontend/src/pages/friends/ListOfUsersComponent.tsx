import React, { FC, useEffect, useState } from "react";
import { getAllUsers } from "../../api/API";
import { User, useUsers } from "../../contextAPI/UsersContextt";
import { UserComponent } from "./UserComponent";
import styles from "./users.module.css";
import { getIdCurrentUser } from "../../../utils/getIdCurrentUser";
//import { useMessages } from "../../contextAPI/MessagesContext";

interface Props {
  hiddenProfile: React.MouseEventHandler<HTMLDivElement>;
}

export const ListOfUsersComponent: FC<Props> = () => {
  const token = localStorage.getItem("token");
  const { userSelected, setUserSelected } = useUsers();
  const [friends, setFriends] = useState<User[]>([]);
  //const { selectedMenuItem } = useMessages();
  useEffect(() => {
    const getFriends = async () => {
      const res = await getAllUsers("/users", token);
      if (res) {
        setFriends(res);
      }
    };
    getFriends();
  }, [token]);

  const selectedUserHandleClick = (item: User) => {
    setUserSelected(item);
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
              profil={user.profileImage}
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
