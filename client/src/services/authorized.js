import Http from "./http";
import { AuthService } from "./auth";

export default class AuthorizedService {
  constructor() {
    this.http = new Http({ credentials: "include" });
  }

  __silentRefresh() {
    AuthService.silentRefresh().catch(() => AuthService.logout());
  }
}
