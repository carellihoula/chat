export interface Message {
    id: number;
    text: string;
    isSender: boolean;
    timestamp: string;
    isRead: boolean;       
    senderName: string;   
}

export interface Conversation {
    conversationId: number;
    participants: number[];
    messages: Message[];
    unreadNumber: number
}

export interface User{
    userId: number;
    username: string;
    email: string;
    password: string;
}

//I'm Alice

export const messages1: Message[] = [
    { id: 1, text: "Salut, comment ça va ...", isSender: false, timestamp: "2021-12-16T09:00:00Z", isRead: true, senderName: "Alice" },
    { id: 2, text: "Bien, et toi ?", isSender: true, timestamp: "2021-12-16T09:01:00Z", isRead: false, senderName: "Bob" },
    { id: 3, text: "Je vais bien aussi, merci.", isSender: false, timestamp: "2021-12-16T09:02:00Z", isRead: true, senderName: "Alice" },
    { id: 4, text: "Quoi de neuf de ton côté ?", isSender: true, timestamp: "2021-12-16T09:05:00Z", isRead: false, senderName: "Bob" },
    { id: 5, text: "Pas grand-chose, juste du travail.", isSender: false, timestamp: "2021-12-16T09:10:00Z", isRead: true, senderName: "Alice" },
    { id: 6, text: "J'ai vu un bon film hier soir.", isSender: true, timestamp: "2021-12-16T09:15:00Z", isRead: false, senderName: "Bob" },
    { id: 7, text: "Vraiment ? Lequel ?", isSender: false, timestamp: "2021-12-16T09:16:00Z", isRead: true, senderName: "Alice" },
    { id: 8, text: "Un thriller, très captivant.", isSender: true, timestamp: "2021-12-16T09:20:00Z", isRead: false, senderName: "Bob" },
    { id: 9, text: "Ça a l'air intéressant !", isSender: false, timestamp: "2021-12-16T09:25:00Z", isRead: true, senderName: "Alice" },
    { id: 10, text: "Oui, je te le recommande.", isSender: true, timestamp: "2021-12-16T09:30:00Z", isRead: false, senderName: "Bob" },
    { id: 11, text: "Vraiment ? Lequel ?", isSender: false, timestamp: "2021-12-16T09:16:00Z", isRead: true, senderName: "Alice" },
    { id: 12, text: "Un thriller, très captivant.", isSender: true, timestamp: "2021-12-16T09:20:00Z", isRead: false, senderName: "Bob" },
    { id: 13, text: "Ça a l'air intéressant !", isSender: false, timestamp: "2021-12-16T09:25:00Z", isRead: true, senderName: "Alice" },
    { id: 14, text: "Oui, je te le recommande.", isSender: true, timestamp: "2021-12-16T09:30:00Z", isRead: false, senderName: "Bob" },
    { id: 15, text: "Oui, je te le recommande.", isSender: true, timestamp: "2021-12-16T09:30:00Z", isRead: true, senderName: "Bob" },
    { id: 16, text: "Vraiment ? Lequel ?", isSender: false, timestamp: "2021-12-16T09:16:00Z", isRead: true, senderName: "Alice" },
    { id: 17, text: "Un thriller, très captivant.", isSender: true, timestamp: "2021-12-16T09:20:00Z", isRead: false, senderName: "Bob" },
    { id: 18, text: "Ça a l'air intéressant !", isSender: false, timestamp: "2021-12-16T09:25:00Z", isRead: true, senderName: "Alice" },
    { id: 19, text: "Oui ff, je te le recommande.", isSender: true, timestamp: "2021-12-16T09:30:00Z", isRead: false, senderName: "Bob" }
];

export const messages2: Message[] = [
    { id: 1, text: "As-tu fini le projet ?", isSender: false, timestamp: "2021-12-16T11:00:00Z", isRead: true, senderName: "Alice" },
    { id: 2, text: "Oui, je l'ai envoyé hier.", isSender: true, timestamp: "2021-12-16T11:15:00Z", isRead: false, senderName: "Kevin" },
    { id: 3, text: "Oui, je l'ai envoyé hier.", isSender: true, timestamp: "2021-12-16T11:15:00Z", isRead: true, senderName: "Alice" },
    { id: 4, text: "Oui, je l'ai envoyé hier.", isSender: true, timestamp: "2021-12-16T11:15:00Z", isRead: false, senderName: "Kevin" },
    { id: 5, text: "Oui, je l'ai envoyé hier.", isSender: true, timestamp: "2021-12-16T11:15:00Z", isRead: true, senderName: "Alice" },
    { id: 6, text: "Oui, je l'ai envoyé hier.", isSender: true, timestamp: "2021-12-16T11:15:00Z", isRead: false, senderName: "Kevin" },// ... d'autres messages
]
export const messages3: Message[] = [
    { id: 1, text: "On se voit demain pour la réunion ?", isSender: true, timestamp: "2021-12-16T15:00:00Z", isRead: true, senderName: "Roger" },
    { id: 2, text: "Oui, à 9h. À demain !", isSender: false, timestamp: "2021-12-16T15:05:00Z", isRead: true, senderName: "Alice" },
    // ... d'autres messages
    { id: 3, text: "On se voit demain pour la réunion ?", isSender: true, timestamp: "2021-12-16T15:00:00Z", isRead: true, senderName: "Alice" },
    { id: 4, text: "Oui, à 9h. À demain !", isSender: false, timestamp: "2021-12-16T15:05:00Z", isRead: true, senderName: "Alice" },
    { id: 5, text: "On se voit demain pour la réunion ?", isSender: true, timestamp: "2021-12-16T15:00:00Z", isRead: false, senderName: "Roger" },
    { id: 6, text: "Oui, à 9h. À demain !", isSender: false, timestamp: "2021-12-16T15:05:00Z", isRead: true, senderName: "Alice" },
    { id: 7, text: "On se voit demain pour la réunion ?", isSender: true, timestamp: "2021-12-16T15:00:00Z", isRead: true, senderName: "Alice" },
    { id: 8, text: "Oui, à 9h. À demain !", isSender: false, timestamp: "2021-12-16T15:05:00Z", isRead: false, senderName: "Roger" },
]

