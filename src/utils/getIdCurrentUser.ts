import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: number;
  sub: string;
  iat: number;
  exp: number;
}

//const token = localStorage.getItem("token");

export const getIdCurrentUser = (token: string | null): number | null => {
  if (token == null) {
    return null;
  }
  const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
  return decoded.userId;
};

/*export const getCurrentUser = async (token: string) => {
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
};*/
