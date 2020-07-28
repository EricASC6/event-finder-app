import Http from "./http";

const http = new Http({ credentials: "include" });

let accessToken = null;

// Token Observable
let tokenObservers = [];

const notifyTokenObservers = () =>
  tokenObservers.forEach((fn) => fn(accessToken));
const subscribe = (fn) => tokenObservers.push(fn);
const unsubscribe = (_fn) => {
  tokenObservers = tokenObservers.filter((fn) => fn !== _fn);
};

// Token Observable

const setAccessToken = (token) => {
  accessToken = token;
};

const handleTokenResponse = (accessToken) => {
  setAccessToken(accessToken);
  notifyTokenObservers();
};

const fetchAccessToken = () => {
  const tokenEndpoint = "/.netlify/functions/api/auth/token";

  return http.post(tokenEndpoint).then((response) => {
    const accessToken = response.data.access_token || null;

    console.log("Got token");
    console.log({ accessToken });

    handleTokenResponse(accessToken);

    return accessToken;
  });
};

const fetchAccessTokenFromIdToken = (idToken) => {
  const tokenEndpoint = "/.netlify/functions/api/auth/login";

  return http.post(tokenEndpoint, { id_token: idToken }).then((response) => {
    const accessToken = response.data.access_token || null;

    console.log("Got token from id token");
    console.log({ accessToken });

    handleTokenResponse(accessToken);

    return accessToken;
  });
};

const removeRefreshTokenAfterLogout = () => {
  console.log("Removing token");

  const logoutEndpoint = "/.netlify/functions/api/auth/logout";

  return http.post(logoutEndpoint).then((response) => {
    handleTokenResponse(null);
  });
};

export const TokenService = {
  subscribe,
  unsubscribe,
  fetchAccessToken,
  fetchAccessTokenFromIdToken,
  removeRefreshTokenAfterLogout,
};
