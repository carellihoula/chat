import { IS_LOGGED_IN } from "./status.action";


// Définir l'Interface pour l'État
interface status {
    isloggedIn: boolean;
}

// Définir l'Interface pour l'Action
interface Action {
    type: string;
    payload: boolean;
}

// Initial State
const initialState: status = {
    isloggedIn: false,
};

// Créer le Reducer
const loggedReducer = (state = initialState, action: Action): status => {
    switch (action.type) {
        case IS_LOGGED_IN:
            return {
                ...state,
                isloggedIn: action.payload,
            };
        default:
            return state;
    }
};

export default loggedReducer;
