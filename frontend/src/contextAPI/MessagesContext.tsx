// MessagesContext.tsx
import React, { createContext, useState, useContext } from "react";

export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
  // Ajoutez d'autres champs si nécessaire
}

interface MessagesContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  selectedMessage: Message | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<Message | null>>;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  return (
    <MessagesContext.Provider
      value={{ messages, setMessages, selectedMessage, setSelectedMessage }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
