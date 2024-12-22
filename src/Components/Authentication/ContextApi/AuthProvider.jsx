import { createContext, useState } from "react"
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase.config";





export const AuthContext = createContext(null);
const auth = getAuth(app)


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // createuser start 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // createuser end


    // login work start 
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // login work end

      //Update Profile start
      const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    //Update Profile End


        // logOut firbase work start
        const logOut = () => {
            setLoading(true);
            return signOut(auth);
        }
        // logOut firbase work end


  // Google Probider start
  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider)
  }
  // Google Probider End

  const unsubscribe = onAuthStateChanged(auth, currentUser => {
    setUser(currentUser);
    console.log('current user', currentUser)})


  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
    unsubscribe
}



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
