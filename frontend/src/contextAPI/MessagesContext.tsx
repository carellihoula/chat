// MessagesContext.tsx
import React, { createContext, useState, useContext } from "react";
import { ChatMessage } from "../websocket/useChat";

interface MessagesContextType {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  selectedMessage: ChatMessage | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>;
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(
    null
  );

  return (
    <MessagesContext.Provider
      value={{ messages, setMessages, selectedMessage, setSelectedMessage }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
