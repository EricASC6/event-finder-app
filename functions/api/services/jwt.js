const jwt = require("jsonwebtoken");

exports.createToken = async (payload, secret, options = {}) => {
  const defaultOptions = { expiresIn: "15min" };
  const combinedOptions = Object.assign({}, defaultOptions, options);

  return jwt.sign(payload, secret, combinedOptions);
};

exports.verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) reject(error);

      resolve(payload);
    });
  });
};

exports.decodeToken = (token) => {
  return jwt.decode(token, {complete: true});
}
