import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";

export const AuthContext = createContext(null)
const auth = getAuth(app)


const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)

    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

        })
        return () => { unsubscribe() }

    }, [])


    const google =() =>{
        return signInWithPopup(auth,googleProvider)
    }


    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logOut,
        google
    }
    return (
        <>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>


        </>
    );
};

export default AuthProvider;