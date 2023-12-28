
import axios from "axios";

export const IS_LOGGED_IN: string = "IS_LOGGED_IN"; 
export const REGISTER: string = "REGISTER";

interface User {
    username: string;
    email:string;
    password:string;

}
// This action creator returns a function (thanks to Redux Thunk)
export const connectUser = (userInfos: Partial<User>) => {
    // The function that takes dispatch as an argument
    return async (dispatch: any) => {
         try {
            const response = await axios.post("http://localhost:9784/auth/login", userInfos );
            // Dispatch an action with type and payload
            dispatch({
                type: IS_LOGGED_IN,
                payload: response.data.token // Assuming you want to store response data
            });
        } catch (error) {
            // Handle errors here, maybe dispatch another action
            console.error("Error during login:", error);
        }
    };
};

export const registerUser = (userInfos: User) => {
    // The function that takes dispatch as an argument
    return async (dispatch: any) => {
         try {
            const response = await axios.post("http://localhost:9784/users", userInfos );
            // Dispatch an action with type and payload
            dispatch({
                type: REGISTER,
                payload: response.data.token // Assuming you want to store response data
            });
        } catch (error) {
            // Handle errors here, maybe dispatch another action
            console.error("Error during login:", error);
        }
    };
};
