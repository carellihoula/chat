// MessagesContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { ChatMessage } from "../websocket/useChat";
import { findChatMessages, findChatsByCurrentUser } from "../api/apiChat";
import { getIdCurrentUser } from "../../utils/getIdCurrentUser";
import { MenuItemProps } from "../pages/leftMenus/MenuItem";
import { listMenuItems } from "../pages/leftMenus/listMenuItems";
import { useUsers } from "./UsersContextt";

interface MessagesContextType {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  selectedMessage: ChatMessage | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>;
  selectedMenuItem: MenuItemProps;
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<MenuItemProps>>;
  msgByCurrentUser: ChatMessage[];
  setMsgByCurrentUser: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const MessagesContext = createContext<MessagesContextType>(
  {} as MessagesContextType
);

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error(
      "useMessages doit être utilisé à l'intérieur d'un MessagesProvider"
    );
  }
  return context;
};

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token: string | null = localStorage.getItem("token");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [msgByCurrentUser, setMsgByCurrentUser] = useState<ChatMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(
    null
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemProps>(
    listMenuItems[0]
  );
  const { userSelected } = useUsers(); //recuperer le User selectionné

  //faire la persistance grace aux messages recuperés depuis la database
  useEffect(() => {
    // historique de messages depuis la database
    const fetchMessages = async () => {
      if (token && userSelected?.id) {
        const senderId = getIdCurrentUser(token);
        const recipientId = userSelected?.id;
        const data = await findChatMessages(
          `${senderId}/${recipientId}`,
          token
        );
        setMessages(data);
      }
    };
    fetchMessages();
  }, [token, userSelected?.id]);

  useEffect(() => {
    // historique de messages depuis la database
    const fetchMessagesByUser = async () => {
      if (token) {
        const currentUserId = getIdCurrentUser(token);
        const data: ChatMessage[] = await findChatsByCurrentUser(
          `${currentUserId}`,
          token
        );
        setMsgByCurrentUser(data);
      }
    };
    fetchMessagesByUser();
  }, [token]);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
        selectedMessage,
        setSelectedMessage,
        selectedMenuItem,
        setSelectedMenuItem,
        setMsgByCurrentUser,
        msgByCurrentUser,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
