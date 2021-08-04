import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";
import firebase from "firebase/app";
import { Loading } from "../components/Loading";

interface AuthContextValues {
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  currentUser: firebase.User | null;
}

const AuthContext = React.createContext({} as AuthContextValues);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const value = {
    login,
    logout,
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Loading size='large'/>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
