import { IS_LOGGED_IN, REGISTER } from "./status.action";


// Définir l'Interface pour l'État
interface status {
    token: string;
}

// Définir l'Interface pour l'Action
interface Action {
    type: string;
    payload: string;
}

// Initial State
const initialState: status = {
    token: "",
};

// Créer le Reducer
const loggedReducer = (state = initialState, action: Action): status => {
    switch (action.type) {
        case IS_LOGGED_IN:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

export const registerReducer = (state = initialState, action: Action): status => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

export default loggedReducer;
