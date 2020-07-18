import firebase from "./firebase";
import Http from "./http";

const auth = firebase.auth();
const http = new Http({ credentials: "include" });

let token = null;

export const storeAccessToken = (_token) => {
  token = _token;
};

export const getAccessToken = () => token;

export const fetchAccessToken = () => {
  const tokenEndpoint =
    "http://localhost:8888/.netlify/functions/api/auth/token";

  return http
    .post(tokenEndpoint)
    .then((response) => response.data.access_token || null);
};

export const fetchAccessTokenFromIdToken = (idToken) => {
  const tokenEndpoint =
    "http://localhost:8888/.netlify/functions/api/auth/login";

  return http
    .post(tokenEndpoint, { id_token: idToken })
    .then((response) => response.data.access_token || null);
};

export const deleteTokenAfterLogout = () => {
  token = null;

  const logoutEndpoint =
    "http://localhost:8888/.netlify/functions/api/auth/logout";

  return http.post(logoutEndpoint);
};

export const getInitialAuthState = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(user);

      unsubscribe();
    });
  });
};
