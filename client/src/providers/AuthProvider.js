import React, { createContext, useState, useEffect } from "react";
import firebase from "../services/firebase";
import {
  fetchAccessToken,
  storeAccessToken,
  fetchAccessTokenFromIdToken,
  deleteTokenAfterLogout,
  getInitialAuthState,
} from "../services/auth";

const auth = firebase.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Mount");

    const initAuth = async () => {
      // check if user is initially authenticated
      const user = await getInitialAuthState();
      console.log({ user });
      console.log({ id_token: await auth.currentUser.getIdToken() });
      if (user) {
        // if yes, get access token from server
        const access_token = await fetchAccessToken();
        console.log({ access_token });

        // if user is not authorized (no access token) sign out
        if (!access_token) logout();

        storeAccessToken(access_token);
      }

      setUser(user);
      setLoading(false);
    };

    initAuth();
  }, []);

  const jwtSignIn = async () => {
    setLoading(true);

    console.log("Signing in");

    const currentUser = auth.currentUser;
    const idToken = await currentUser.getIdToken();
    const access_token = await fetchAccessTokenFromIdToken(idToken);

    console.log({ access_token });

    storeAccessToken(access_token);
    setUser(currentUser);

    setLoading(false);
  };

  const jwtSignOut = async () => {
    setLoading(true);
    setUser(auth.currentUser);
    await deleteTokenAfterLogout();
    setLoading(false);
  };

  const signup = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password).then(jwtSignIn);

  const login = (email, password) =>
    auth.signInWithEmailAndPassword(email, password).then(jwtSignIn);

  const logout = () => auth.signOut().then(jwtSignOut);

  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(googleProvider).then(jwtSignIn);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
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
