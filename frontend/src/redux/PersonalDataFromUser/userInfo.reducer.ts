// userReducer.ts

import { GET_USER_INFO } from "./userInfo.action";

interface UserState {
  userInfo?: {
    _id?: string;
    email?: string;
    username?: string;
    about?: string;
  };
}

const initialState: UserState = {
  userInfo: {
    email: "",
    username: "",
    about: "",
  },
  // Autres états initiaux si nécessaire
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
): UserState => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    // Autres cases pour d'autres actions liées à l'utilisateur si nécessaire
    default:
      return state;
  }
};

export default userReducer;
