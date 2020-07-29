import { AuthService } from "../services/auth";

export const handleResponse = (response) => {
  const status = response.status;

  const validResponse = !(599 >= status && status >= 400);

  if (!validResponse) {
    if ([401, 403].indexOf(status) !== -1) {
      AuthService.logout();
    }

    const data = response.data;
    const errorMessage = (data && data.error) || status;

    return Promise.reject(errorMessage);
  }

  return response;
};
