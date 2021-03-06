export const combineApiWithQueryParams = (api, params) => {
  let combined = `${api}?`;
  for (const [key, value] of Object.entries(params)) {
    if (value !== null) combined += `${key}=${value}&`;
  }

  // encodes url to be safe
  return encodeURI(combined);
};
