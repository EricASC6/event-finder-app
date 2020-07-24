import Http from "./http";
import _ from "lodash";
import { authHeader } from "../helpers/auth-header";

const http = new Http({ credentials: "include" });

const createAuthOptions = (configs) => {
  const header = authHeader();
  return _.merge({ headers: header }, configs);
};

const get = (url, configs = {}) => {
  const options = createAuthOptions(configs);
  return http.get(url, options);
};

export const AuthorizedService = {
  get,
};
