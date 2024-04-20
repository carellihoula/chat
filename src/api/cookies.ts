import Cookies from "js-cookie";

export const getTokenFromCookie = (value: string): string | undefined => {
  return Cookies.get(value);
};
