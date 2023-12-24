import {Conversation} from './utils'
import {messages1, messages2, messages3} from './utils'
import {listOfUsers} from './ListOfUser'
import {countUnreadMessage} from './countUnreadMessage'


const currentUser = listOfUsers[0]

export const conversations: Conversation[] = [
    {
      conversationId: 1,
      participants: [listOfUsers[0].userId, listOfUsers[1].userId],
      messages: messages1,
      unreadNumber:countUnreadMessage(messages1, currentUser)
    },
    {
      conversationId :2,
      participants: [listOfUsers[0].userId, listOfUsers[2].userId],
      messages: messages2,
      unreadNumber: countUnreadMessage(messages2, currentUser)
    },
    {
      conversationId: 3,
      participants: [listOfUsers[0].userId, listOfUsers[3].userId],
      messages: messages3,
      unreadNumber: countUnreadMessage(messages3, currentUser)
    },
    

]