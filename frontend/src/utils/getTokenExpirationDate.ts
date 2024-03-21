import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export const getTokenExpirationDate = (token: string): number => {
  const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
  const dateExpToken = decoded.exp;
  return dateExpToken;
};
