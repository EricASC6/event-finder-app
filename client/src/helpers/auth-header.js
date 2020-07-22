import { AuthService } from "../services/auth";

export const authHeader = () => {
  const accessToken = AuthService.getAccessToken();
  const token = accessToken && accessToken.token;
  const authHeader = token ? `Bearer ${token}` : null;

  return { Authorization: authHeader };
};
