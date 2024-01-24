import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

//const token = localStorage.getItem("token");

export const getIdCurrentUser = (token: string) => {
  const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
  const idCurrentUser = decoded.id;
  //console.log(idCurrentUser) ;
  return idCurrentUser;
};
export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(
      `https://localhost:9784/users/${getIdCurrentUser(token)}`
    );
    console.log(response.data); // Log the data if needed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
