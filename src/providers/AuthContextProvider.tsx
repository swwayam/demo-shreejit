import { useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import {auth} from "../firebaseConfig"
import {onAuthStateChanged} from 'firebase/auth'

const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        
        onAuthStateChanged(auth, (user) => {
            if(user){
                setIsLoggedIn(true)
            }else{
                setIsLoggedIn(false)
            }
        })
        
    }, [])
    return(
        <AuthContext.Provider value={{setIsLoggedIn,isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider