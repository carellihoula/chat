import { getIdCurrentUser } from "../../../utils/getIdCurrentUser";
import { useMessages } from "../../contextAPI/MessagesContext";
import { getSpecificUser } from "../../../utils/getSpecificUserFromListUser";
import { User, useUsers } from "../../contextAPI/UsersContextt";
import UserMessage from "./UserMessage";
import { ChatMessage } from "../../websocket/useChat";

export const ConversationsList = () => {
  const { msgByCurrentUser } = useMessages();
  const { usersList, setUserSelected, userSelected } = useUsers();
  const token = localStorage.getItem("token");

  const conversationsList: Record<string, ChatMessage> =
    msgByCurrentUser.reduce(
      (acc: Record<string, ChatMessage>, msg: ChatMessage) => {
        if (msg.chatId) {
          acc[msg.chatId] = msg;
        }
        return acc;
      },
      {}
    );

  const filteredConversations = Object.values(conversationsList).sort(
    (a: ChatMessage, b: ChatMessage) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const selectUser = (user: User) => {
    setUserSelected(user);
  };

  return (
    <div>
      {filteredConversations.map((message) => {
        const timer = new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        if (!message.chatId) {
          return null; // Ignore les messages sans chatId, bien que déjà filtrés
        }
        const otherUserId =
          message.senderId === getIdCurrentUser(token)
            ? message.recipientId
            : message.senderId;

        const otherUserInfo = getSpecificUser(usersList, Number(otherUserId));
        const unreadNumber = 10;
        const isSelected = false;
        return (
          <UserMessage
            key={message.chatId}
            name={otherUserInfo?.name}
            message={message.content}
            unreadNumber={unreadNumber}
            time={timer}
            profil={otherUserInfo?.profileImage}
            isSelected={userSelected?.id === otherUserInfo.id}
            bg={isSelected ? "#selectedColor" : "#defaultColor"}
            handleClick={() => selectUser(otherUserInfo)}
          />
        );
      })}
    </div>
  );
};
