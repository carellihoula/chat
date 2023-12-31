import { jwtDecode } from "jwt-decode";

interface DecodedToken{
    id: string;
}

export const getIdCurrentUser = (token: string) => {
    const decoded: DecodedToken  = jwtDecode<DecodedToken>(token)
    const idCurrentUser = decoded.id ; console.log(idCurrentUser) ;
    return  idCurrentUser;
}

