const express = require("express");
const router = express.Router();
const jwt = require("../services/jwt");
const admin = require("../admin/admin");
const authController = require("../controllers/auth");

const firestore = admin.firestore();

router.post("/login", async (req, res) => {
  console.log({ body: req.body });

  // get id token from request body
  const { id_token } = req.body;

  console.log({ id_token });

  try {
    // validate and get the uid from the decoded id token (jwt)
    const decodedToken = await authController.verifyIdToken(id_token);
    const { uid } = decodedToken;

    const userPayload = await authController.createUserPayloadForJwt(uid);
    const accessToken = await authController.createAccessTokenForUser(
      userPayload
    );

    console.log({ accessToken });

    const exp = authController.getTokenExpiration(accessToken);
    const refreshToken = await authController.createRefreshTokenForUser(
      userPayload
    );
    await authController.storeNewRefreshToken(uid, refreshToken);

    res.cookie("refresh_token", refreshToken);

    return res.json({
      access_token: {
        token: accessToken,
        exp,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(400).json({
      error: "Invalid Id Token or Internal Server Error",
    });
  }
});

router.post("/token", async (req, res) => {
  const { refresh_token } = req.cookies;

  console.log("refresh_token ", refresh_token);

  if (!refresh_token)
    return res.status(400).json({ error: "Missing refresh token" });

  try {
    const validToken = await authController.validateRefreshToken(refresh_token);

    if (!validToken) return res.status(400).json({ error: "Invalid Token" });

    const { uid } = validToken;
    const userPayload = await authController.createUserPayloadForJwt(uid);
    const newAccessToken = await authController.createAccessTokenForUser(
      userPayload
    );
    const exp = authController.getTokenExpiration(newAccessToken);

    const newRefreshToken = await authController.createRefreshTokenForUser(
      userPayload
    );

    await Promise.all([
      authController.revokeRefreshTokenFromUser(uid, refresh_token),
      authController.storeNewRefreshToken(uid, newRefreshToken),
    ]);

    res.cookie("refresh_token", newRefreshToken);

    return res.json({
      access_token: {
        token: newAccessToken,
        exp,
      },
    });
  } catch (err) {
    console.log({ err });

    // decode the token (don't verify it)
    const decodedToken = jwt.decodeToken(refresh_token);

    if (decodedToken.uid) {
      const uid = decodedToken.uid;

      const userRef = firestore.collection("users").doc(uid);

      const user = await userRef.get();

      if (user.exists) {
        // remove refresh token from user doc
        await authController.revokeRefreshTokenFromUser(uid, refresh_token);
      }
    }

    res.clearCookie("refresh_token");

    return res.status(400).json({ error: "Invalid token" });
  }
});

router.post("/logout", async (req, res) => {
  const { refresh_token } = req.cookies;

  console.log({ refresh_token });

  if (!refresh_token) return res.json({ message: "logged out" });

  const decodedToken = jwt.decodeToken(refresh_token);

  console.log(decodedToken);

  const { uid } = decodedToken.payload;

  console.log({ uid });

  try {
    await authController.revokeRefreshTokenFromUser(uid, refresh_token);
  } catch (err) {
    console.error(err);
  } finally {
    res.clearCookie("refresh_token");
    res.json({ message: "logged out" });
  }
});

module.exports = router;
