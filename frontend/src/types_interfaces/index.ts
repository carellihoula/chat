
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