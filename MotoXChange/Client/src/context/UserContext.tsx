import { useState, useContext, createContext, ReactNode } from "react";
import React from "react";

interface UserContextType {
    email?: string;
    setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
    firstName?: string;
    setFirstName: React.Dispatch<React.SetStateAction<string | undefined>>;
    lastName?: string;
    setLastName: React.Dispatch<React.SetStateAction<string | undefined>>;
  }

const UserContext = createContext<UserContextType|undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    const [email,setEmail] = useState<string>();
    const [firstName,setFirstName] = useState<string>();
    const [lastName,setLastName] = useState<string>();

    return <UserContext.Provider value={{email, setEmail, firstName, setFirstName, lastName, setLastName}}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextType=>{
    const context = useContext(UserContext);
    if(!context)
        throw new Error("useUser must be used within a UserProvider");
    else    
        return context;
}
