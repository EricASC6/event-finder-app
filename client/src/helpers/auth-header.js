import { AuthService } from "../services/auth";

export const authHeader = () => {
  const accessToken = AuthService.credentials.accessToken;
  const authHeader = accessToken ? `Bearer ${accessToken}` : null;

  return { Authorization: authHeader };
};
