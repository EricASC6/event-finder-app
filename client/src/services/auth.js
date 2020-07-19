import firebase from "./firebase";
import { TokenService } from "./token";

const auth = firebase.auth();

let token = null;

const getAccessToken = () => token;

const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    const idToken = await userCredential.user.getIdToken();
    const accessToken = await TokenService.fetchAccessTokenFromIdToken(idToken);

    console.log({ accessToken });
    token = accessToken;

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
    token = accessToken;

    return userCredential.user;
  } catch (err) {
    throw err;
  }
};

const silentRefresh = async () => {
  try {
    const accessToken = await TokenService.fetchAccessToken();

    console.log({ accessToken });

    token = accessToken;
  } catch (err) {
    throw err;
  }
};

const logout = async () => {
  token = null;

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
  getAccessToken,
};
