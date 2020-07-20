import Cache from "./cache";
import _ from "lodash";

export default class Http {
  constructor(configs, withCache = false) {
    this.configs = _.merge(
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      configs
    );

    this.cache = withCache ? new Cache() : null;
  }

  __mergeConfigs(configs = {}) {
    const initConfigs = _.merge({}, this.configs);
    const mergedConfigs = _.merge(initConfigs, configs);
    return mergedConfigs;
  }

  /**
   * @param {Headers} headers
   */
  __extractKeyValuePairsFromHeaders(headers) {
    const pairs = {};
    for (const [key, value] of headers.entries()) {
      pairs[key] = value;
    }

    return pairs;
  }

  __createConfigs(method, data, configs) {
    const body = JSON.stringify(data);
    return Object.assign({}, configs, { method, body });
  }

  async makeRequest(url, configs = {}) {
    const mergedConfigs = this.__mergeConfigs(configs);
    console.log({ mergedConfigs });

    const { method = "GET" } = mergedConfigs;

    const { cache } = this;

    if (cache && method === "GET" && cache.has(url)) {
      return cache.get(url);
    }

    try {
      const response = await fetch(url, mergedConfigs);
      const status = response.status;
      const headers = response.headers;
      const headersPairs = this.__extractKeyValuePairsFromHeaders(headers);

      const json = await response.json();

      const result = {
        status,
        headers: headersPairs,
        data: json,
      };

      if (cache && method === "GET") {
        cache.set(url, result);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async get(url, configs = {}) {
    return this.makeRequest(url, configs);
  }

  async post(url, data = {}, configs = {}) {
    const initialConfigs = this.__createConfigs("POST", data, configs);
    const combinedConfigs = this.__mergeConfigs(initialConfigs);
    return this.makeRequest(url, combinedConfigs);
  }

  async put(url, data = {}, configs = {}) {
    const initialConfigs = this.__createConfigs("PUT", data, configs);
    const combinedConfigs = this.__mergeConfigs(initialConfigs);
    return this.makeRequest(url, combinedConfigs);
  }

  async delete(url, data = {}, configs = {}) {
    const initialConfigs = this.__createConfigs("DELETE", data, configs);
    const combinedConfigs = this.__mergeConfigs(initialConfigs);
    return this.makeRequest(url, combinedConfigs);
  }
}
