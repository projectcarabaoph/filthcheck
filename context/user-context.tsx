"use client"
import { createContext, useContext } from "react";
import type { IUserData, TUserContext } from "@/context/_types";

const UserContext = createContext<IUserData | undefined>(undefined)

export const UserProvider = ({ children, userData }: TUserContext) => {

    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext



export const useUser = (): IUserData => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};