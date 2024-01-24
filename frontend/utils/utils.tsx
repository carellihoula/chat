import { Message } from "../src/contextAPI/MessagesContext";

export interface Conversation {
  conversationId: number;
  participants: number[];
  messages: Message[];
  unreadNumber: number;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
}
