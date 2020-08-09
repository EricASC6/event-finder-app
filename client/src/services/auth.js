import firebase from "./firebase";
import { TokenService } from "./token";

const auth = firebase.auth();

const credentials = {
  accessToken: null,
};

// Token Service Subscription
TokenService.subscribe((accessToken) => {
  console.log("Token change");
  console.log({ accessToken });

  credentials.accessToken = accessToken;
});
// Token Service Subscription

const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    const idToken = await userCredential.user.getIdToken();
    const accessToken = await TokenService.fetchAccessTokenFromIdToken(idToken);

    console.log({ accessToken });

    return userCredential.user;
  } catch (err) {
    throw err;
  }
};

const signup = async (email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    const accessToken = await TokenService.fetchAccessTokenFromIdToken(idToken);

    console.log({ accessToken });
    return userCredential.user;
  } catch (err) {
    throw err;
  }
};

const signInWithGoogle = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(googleProvider).then(async () => {
    const user = firebase.auth().currentUser;
    const idToken = await user.getIdToken();
    const accessToken = await TokenService.fetchAccessTokenFromIdToken(idToken);

    console.log({ accessToken });

    return user;
  });
};

const silentRefresh = async () => {
  try {
    const accessToken = await TokenService.fetchAccessToken();

    console.log({ accessToken });

    if (!accessToken) throw new Error("Missing Access Token");

    return accessToken;
  } catch (err) {
    throw err;
  }
};

const logout = async () => {
  await Promise.all([
    auth.signOut(),
    TokenService.removeRefreshTokenAfterLogout(),
  ]);

  return;
};

export const AuthService = {
  login,
  signup,
  silentRefresh,
  logout,
  signInWithGoogle,
  credentials,
};
