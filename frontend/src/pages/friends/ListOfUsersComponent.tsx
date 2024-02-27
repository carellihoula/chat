import React, { FC, useEffect, useState } from "react";
import { getAllUsers } from "../../api/API";
import { User } from "../../contextAPI/UsersContextt";
import { UserComponent } from "./UserComponent";
import styles from "./users.module.css";
import { useMessages } from "../../contextAPI/MessagesContext";

interface Props {
  hiddenProfile: React.MouseEventHandler<HTMLDivElement>;
}

export const ListOfUsersComponent: FC<Props> = () => {
  const token = localStorage.getItem("token");
  const [friends, setFriends] = useState<User[]>([]);
  const { selectedMenuItem } = useMessages();
  useEffect(() => {
    const getFriends = async () => {
      const res = await getAllUsers("/users", token);
      if (res) {
        setFriends(res);
      }
    };
    getFriends();
  }, [token]);
  return (
    <div
      className={`${styles.list__users__div} ${
        selectedMenuItem.label === "Friends"
          ? styles.transform__0
          : styles.transform__100
      }`}
    >
      {friends?.map((user: User, index: number) => {
        return (
          <div key={index}>
            <UserComponent
              name={user.name}
              profil={user.profileImage}
              key={index}
              bg="#2f3136"
              isSelected={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListOfUsersComponent;
