import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => { // Corrected here: { children } instead of [children]
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };
    const googleSignIn =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);

    }

    const  updateUserprofile= (displayName, photoURL) => {
        return updateProfile(auth.currentUser, { displayName, photoURL });
    };

         
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            
            if(currentUser)
                {
                    const userInfo = {
                        email : currentUser.email,
        
                    }

                    axiosPublic.post("/jwt",userInfo)
                    .then(res=>{
                        if(res.data.token)
                            {
                                localStorage.setItem('acess-token', res.data.token);
                                setLoading(false);
                            }
                    })
                }
                else
                {
                    localStorage.removeItem('acess-token');
                    setLoading(false);
                }
            console.log('Current user:', currentUser);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        createUser,
        signIn,
        loading,
        logout,
        updateUserprofile,
        googleSignIn
       
    

    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
