import React, { useState } from "react";
import UserContext from "../context/UserContext";

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const name = "Swayam";
    return(
        <UserContext.Provider value={{user, setUser, name}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider