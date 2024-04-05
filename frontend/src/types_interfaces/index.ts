import { IconType } from "react-icons";

export interface User {
  id: number;
  email: string;
  profileImage: string;
  name: string;
  username: string;
  status: string | null;
  active: boolean;
  password: string;
  role: string;
}
export interface ChatMessage {
  id?: number;
  chatId?: string;
  senderId: number | null;
  recipientId?: number;
  content: string;
  isRead?: boolean;
  timestamp: Date;
}

export interface Conversation {
  chatId: string;
  messages: ChatMessage[];
  unreadCount: number;
  lastMessage: ChatMessage;
}

export type optionPosition = {
  x: number;
  y: number;
  onDeleteHandler?: React.MouseEventHandler<HTMLDivElement>;
  onMarkHandler?: React.MouseEventHandler<HTMLDivElement>;
  onClearAllHandler?: React.MouseEventHandler<HTMLDivElement>;
  onArchiveHandler?: React.MouseEventHandler<HTMLDivElement>;
};

export type OptionItemConversation = {
  label: string;
  Icon: IconType | string;
  onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
};
