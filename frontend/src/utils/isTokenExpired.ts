import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export const isTokenExpired = (token: string) => {
  const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
  const dateExpToken = decoded.exp;
  console.log("expires at :" + dateExpToken, "now: " + Date.now() / 1000);
  return dateExpToken < Date.now() / 1000;
};
