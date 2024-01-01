
import axios from "axios";

export const GET_USER_INFO: string = "GET_USER_INFO"; 

export const getUserInfo = (id:string) => {
    // The function that takes dispatch as an argument
    return async (dispatch: any) => {
         try {
            const response = await axios.get(`http://localhost:9784/users/${id}`, {
                withCredentials: true // Ajout de l'option withCredentials
            } );
            // Dispatch an action with type and payload
            dispatch({
                type: GET_USER_INFO,
                payload: response.data.data // Assuming you want to store response data
            });
        } catch (error) {
            // Handle errors here, maybe dispatch another action
            console.error("Error during login:", error);
        }
    };
};
