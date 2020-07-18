export default class Cache {
  constructor() {
    this.cache = new Map();
  }

  __checkIsExpired(exp) {
    const currentTime = new Date();
    return currentTime > exp;
  }

  set(key, value, exp = 1000 * 60 * 15) {
    const expiration = new Date(new Date().getTime() + exp);
    const storedValue = { value, exp: expiration };
    return this.cache.set(key, storedValue);
  }

  has(key) {
    const storedValue = this.cache.get(key);

    if (!storedValue) return false;

    const { exp } = storedValue;
    const isExpired = this.__checkIsExpired(exp);
    if (isExpired) {
      this.delete(key);
      return false;
    }

    return true;
  }

  get(key) {
    const storedValue = this.cache.get(key);
    if (!storedValue) return null;

    const { value, exp } = storedValue;
    const isExpired = this.__checkIsExpired(exp);

    if (isExpired) {
      this.delete(key);
      return null;
    }

    return value;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    return this.cache.clear();
  }
}
