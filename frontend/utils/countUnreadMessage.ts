import {Message, User} from './utils'

export const countUnreadMessage = (messages: Message[], currentUser: User): number => {
    return messages.reduce((count, message) => {
        return currentUser.username !== message.senderName && !message.isRead ? count + 1 : count 
    },0)
}