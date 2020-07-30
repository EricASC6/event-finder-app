import React, { createContext, useState, useEffect } from "react";
import firebase from "../services/firebase";
import { AuthService } from "../services/auth";
import { useHistory } from "react-router-dom";

const auth = firebase.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    console.log("Mount");

    AuthService.silentRefresh()
      .catch(() => history.push("/login"))
      .finally(() => setTokenLoading(false));

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(true);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [history]);

  const signup = async (email, password) => AuthService.signup(email, password);

  const login = async (email, password) => AuthService.login(email, password);

  const logout = () => AuthService.logout();

  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(googleProvider);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        tokenLoading,
        user,
        signup,
        login,
        logout,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
