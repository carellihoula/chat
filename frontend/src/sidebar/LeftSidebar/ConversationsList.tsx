import { getIdCurrentUser } from "../../utils/getIdCurrentUser.ts";
import { useMessages } from "../../contextAPI/MessagesContext.tsx";
import { getSpecificUser } from "../../utils/getSpecificUserFromListUser.ts";
import { useUsers } from "../../contextAPI/UsersContextt.tsx";

import styles from "./LeftSidebar.module.css";
import { useEffect, useState } from "react";
import default_img from "../../assets/images/default__image.jpg";
import { ChatMessage, Conversation, User } from "../../types_interfaces";
import { setUserSelectedId } from "../../localStorage/setUserSelected.ts";
import { getUserSelectedId } from "../../localStorage/getUserSelected.ts";
import ConversationItem from "./ConversationItem.tsx";
//import { getUserSelectedId } from "../../localStorage/getUserSelected.ts";

export const ConversationsList = () => {
  const { msgByCurrentUser } = useMessages();
  const [sortedConversations, setSortedConversations] = useState<
    Conversation[]
  >([]);
  const userSelectedId = Number(getUserSelectedId());
  const { usersList, setUserSelected, userSelected } = useUsers();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const conversationsList: Conversation[] = msgByCurrentUser.reduce(
      (acc: Conversation[], msg: ChatMessage) => {
        if (!msg.chatId) return acc;
        const existingConversationIndex = acc.findIndex(
          (conv) => conv.chatId === msg.chatId
        );
        if (existingConversationIndex !== -1) {
          const existingConversation = acc[existingConversationIndex];
          existingConversation.messages.push(msg);
          if (
            !msg.isRead &&
            msg.senderId !== getIdCurrentUser(token) &&
            msg.senderId !== userSelected?.id
          ) {
            existingConversation.unreadCount++;
          }
          existingConversation.lastMessage = msg;
        } else {
          acc.push({
            chatId: msg.chatId,
            messages: [msg],
            unreadCount:
              !msg.isRead && msg.senderId !== getIdCurrentUser(token) ? 1 : 0,
            lastMessage: msg,
          });
        }

        return acc;
      },
      []
    );

    const filteredConversations = Object.values(conversationsList).sort(
      (a, b) =>
        new Date(b.lastMessage.timestamp).getTime() -
        new Date(a.lastMessage.timestamp).getTime()
    );
    setSortedConversations(filteredConversations);
  }, [msgByCurrentUser]);

  const selectUser = (user: User) => {
    setUserSelected(user);
    setUserSelectedId(user.id.toString());
  };
  const onDeleteHandler = (id: string) => {
    alert("id concerné : " + id);
  };

  return (
    <div className={styles.container__conversations}>
      {sortedConversations.map((message) => {
        const timer = new Date(
          message.lastMessage.timestamp
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        if (!message.chatId) {
          return null; // Ignore les messages sans chatId, bien que déjà filtrés
        }
        const otherUserId =
          message.lastMessage.senderId === getIdCurrentUser(token)
            ? message.lastMessage.recipientId
            : message.lastMessage.senderId;

        const otherUserInfo = getSpecificUser(usersList, Number(otherUserId));
        const isSelected = false;
        return (
          <ConversationItem
            key={message.chatId}
            name={otherUserInfo?.name}
            message={message.lastMessage.content}
            unreadNumber={message.unreadCount}
            time={timer}
            profil={otherUserInfo?.profileImage || default_img}
            isSelected={userSelectedId === otherUserInfo.id}
            bg={isSelected ? "#selectedColor" : "#defaultColor"}
            handleClick={() => selectUser(otherUserInfo)}
            onDeleteHandler={() => onDeleteHandler(message.chatId)}
          />
        );
      })}
    </div>
  );
};
