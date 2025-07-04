import { UserTokenData } from "@/types/token";
import { jwtDecode } from "jwt-decode";

export const getCurrentUser = (userToken) => {
    const user = jwtDecode(userToken) as UserTokenData;
    return user;
}