import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        // signInWithRedirect(auth, provider);
    }

    const logOut = () => {
        localStorage.clear()
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => useContext(AuthContext)