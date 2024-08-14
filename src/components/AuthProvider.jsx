  import { createContext, useEffect, useState } from "react";
import auth from "./firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
  
  export const AuthContext = createContext(null);
  
  const googleProvider = new GoogleAuthProvider();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);
  
    const logout = async () => {
      signOut(auth);
      setUser(null);
    //   const { data } = await axios.post(
    //     `${import.meta.env.VITE_API_URL}/logout`,
    //     {},
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(data);
  
      setLoading(false);
    };
  
    const allValues = {
      createUser,
      googleLogin,
      loading,
      user,
      updateUserProfile,
      logout,
      signInUser,
      setUser,
    };
  
    return (
      <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;