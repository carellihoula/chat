import { Conversation } from "../../../utils/utils"

const CONVERSATION_SELECTED: string = "CONVERSATION_SELECTED"

export const manageConversationSelected = (conversation: Conversation):{type: string, payload: Conversation} => {
    return {
        type: CONVERSATION_SELECTED,
        payload: conversation
    }
}