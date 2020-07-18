exports.createQueryString = (params) => {
  let queryParams = "?";

  const entries = Object.entries(params);

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    queryParams += `${key}=${value}`;

    if (i === entries.length - 1) break;

    queryParams += "&";
  }

  return queryParams;
};
