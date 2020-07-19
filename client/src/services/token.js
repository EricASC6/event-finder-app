import Http from "./http";

const http = new Http({ credentials: "include" });

const fetchAccessToken = () => {
  const tokenEndpoint =
    "http://localhost:8888/.netlify/functions/api/auth/token";

  return http
    .post(tokenEndpoint)
    .then((response) => response.data.access_token || null);
};

const fetchAccessTokenFromIdToken = (idToken) => {
  const tokenEndpoint =
    "http://localhost:8888/.netlify/functions/api/auth/login";

  return http
    .post(tokenEndpoint, { id_token: idToken })
    .then((response) => response.data.access_token || null);
};

const removeRefreshTokenAfterLogout = () => {
  console.log("Removing token");

  const logoutEndpoint =
    "http://localhost:8888/.netlify/functions/api/auth/logout";

  return http.post(logoutEndpoint).then((res) => console.log(res));
};

export const TokenService = {
  fetchAccessToken,
  fetchAccessTokenFromIdToken,
  removeRefreshTokenAfterLogout,
};
