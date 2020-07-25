const authController = require("../controllers/auth");

exports.jwtAuth = () => {
  return async (req, res, next) => {
    const authHeader = req.header("Authorization");

    // console.log({ authHeader });

    if (!authHeader)
      return res.status(400).json({
        error: "No Authorization Header",
      });

    const [type, token] = authHeader.split(" ");

    // console.log({ type });
    // console.log({ token });

    if (type !== "Bearer")
      return res.status(400).json({
        error: "Token has to be of type Bearer",
      });

    try {
      const decodedToken = await authController.validateAccessToken(token);

      // console.log({ decodedToken });
      req.user = decodedToken;

      return next();
    } catch (err) {
      return res.status(400).json({ error: "Invalid Token" });
    }
  };
};
