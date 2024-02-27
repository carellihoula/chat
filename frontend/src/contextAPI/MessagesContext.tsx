// MessagesContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { ChatMessage } from "../websocket/useChat";
import { findChatMessages } from "../api/apiChat";
import { getIdCurrentUser } from "../../utils/getIdCurrentUser";
import { MenuItemProps } from "../pages/leftMenus/MenuItem";
import { listMenuItems } from "../pages/leftMenus/listMenuItems";

interface MessagesContextType {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  selectedMessage: ChatMessage | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>;
  selectedMenuItem: MenuItemProps;
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<MenuItemProps>>;
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
  const token: string = localStorage.getItem("token") as string;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(
    null
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemProps>(
    listMenuItems[0]
  );

  const senderId = getIdCurrentUser(token);
  const recipientId = getIdCurrentUser(token) === 1 ? 3 : 1;
  //faire la persistance grace aux messages recuperés depuis la database
  useEffect(() => {
    // historique de messages depuis la database
    const initMessages = (senderId: number, recipientId: number) => {
      const data = findChatMessages(`${senderId}/${recipientId}`, token);
      return data;
    };
    initMessages(senderId, recipientId).then((data) => {
      setMessages(data);
    });
  }, [senderId, recipientId, token]);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
        selectedMessage,
        setSelectedMessage,
        selectedMenuItem,
        setSelectedMenuItem,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
