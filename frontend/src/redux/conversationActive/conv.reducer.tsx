import { Conversation } from "../../../utils/utils";
import {conversations} from '../../../utils/ListOfConversations'
// Définir l'Action Type
const CONVERSATION_SELECTED: string = "CONVERSATION_SELECTED";

// Définir l'Interface pour l'État
interface ConversationState {
    selectedConversation: Conversation;
}

// Définir l'Interface pour l'Action
interface Action {
    type: string;
    payload: Conversation;
}

// Initial State
const initialState: ConversationState = {
    selectedConversation: conversations[0],
};

// Créer le Reducer
const conversationReducer = (state = initialState, action: Action): ConversationState => {
    switch (action.type) {
        case CONVERSATION_SELECTED:
            return {
                ...state,
                selectedConversation: action.payload,
            };
        default:
            return state;
    }
};

export default conversationReducer;
