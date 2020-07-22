import Http from "./http";
import { AuthService } from "./auth";
import { TokenService } from "./token";
import _ from "lodash";
import { authHeader } from "../helpers/auth-header";
import { auth } from "firebase";

export default class AuthorizedService {
  constructor() {
    this.http = new Http({ credentials: "include" });
  }

  silentRefresh() {
    const token = AuthService.getAccessToken();
    const { exp } = token;

    const isExpired = TokenService.isExpiredToken(exp);
    if (isExpired) {
      return AuthService.silentRefresh()
        .then(() => AuthService.getAccessToken())
        .catch(() => {
          AuthService.logout();
          return Promise.reject("Failed Silent Refresh");
        });
    }

    return Promise.resolve();
  }

  get(url, options = {}) {
    this.silentRefresh().then(() => {
      const configs = _.merge({ headers: authHeader() }, options);
      return this.http.get(url, configs);
    });
  }
}
