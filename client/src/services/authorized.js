import Http from "./http";
import _ from "lodash";
import { authHeader } from "../helpers/auth-header";
import { handleResponse } from "../helpers/handle-response";

const http = new Http();

const createAuthOptions = (configs) => {
  const header = authHeader();
  return _.merge({ headers: header }, configs);
};

const get = (url, configs = {}) => {
  const options = createAuthOptions(configs);
  return http.get(url, options).then(handleResponse);
};

const post = (url, data = {}, configs = {}) => {
  const options = createAuthOptions(configs);
  return http.post(url, data, options).then(handleResponse);
};

const put = (url, data = {}, configs = {}) => {
  const options = createAuthOptions(configs);
  return http.put(url, data, options).then(handleResponse);
};

const _delete = (url, data, configs = {}) => {
  const options = createAuthOptions(configs);
  return http.delete(url, data, options).then(handleResponse);
};

export const AuthorizedService = {
  get,
  post,
  put,
  delete: _delete,
};
