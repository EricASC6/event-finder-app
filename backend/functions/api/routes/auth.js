const express = require("express");
const router = express.Router();
const jwt = require("../services/jwt");
const admin = require("../admin/admin");

const firestore = admin.firestore();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "123";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "456";

// router.use(express.json());
router.post("/login", async (req, res) => {
  console.log({ body: req.body });

  // get id token from request body
  const { id_token } = req.body;

  console.log({ id_token });

  try {
    // validate and get the uid from the decoded id token (jwt)
    const decodedToken = await admin.auth().verifyIdToken(id_token);
    const { uid } = decodedToken;

    const userDoc = await firestore.collection("users").doc(uid).get();
    const user = userDoc.data();

    const payload = { email: user.email, uid };

    const accessToken = await jwt.createToken(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "5h",
    });
    const refreshToken = await jwt.createToken(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "30 days",
    });

    // get the user document
    const userRef = firestore.collection("users").doc(uid);

    // add the refresh token to the document
    await userRef.update({
      refresh_tokens: admin.firestore.FieldValue.arrayUnion(refreshToken),
    });

    res.cookie("refresh_token", refreshToken);

    return res.json({
      access_token: accessToken,
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
    const decodedToken = await jwt.verifyToken(
      refresh_token,
      REFRESH_TOKEN_SECRET
    );

    const { uid } = decodedToken;

    const userRef = firestore.collection("users").doc(uid);
    const userDoc = await userRef.get();

    const user = userDoc.data();

    const validToken = user.refresh_tokens.includes(refresh_token);

    if (!validToken) return res.status(400).json({ error: "Invalid Token" });

    const payload = { email: user.email, uid };

    const newAccessToken = await jwt.createToken(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "5h",
    });
    const newRefreshToken = await jwt.createToken(
      payload,
      REFRESH_TOKEN_SECRET,
      { expiresIn: "30 days" }
    );

    await Promise.all([
      userRef.update({
        refresh_tokens: admin.firestore.FieldValue.arrayRemove(refresh_token),
      }),
      userRef.update({
        refresh_tokens: admin.firestore.FieldValue.arrayUnion(newRefreshToken),
      }),
    ]);

    res.cookie("refresh_token", newRefreshToken);

    return res.json({
      access_token: newAccessToken,
    });
  } catch (err) {
    // decode the token (don't verify it)
    const decodedToken = jwt.decodeToken(refresh_token);

    if (decodedToken && decodedToken.uid) {
      const uid = decodedToken.uid;

      const userRef = firestore.collection("users").doc(uid);

      const user = await userRef.get();

      if (user.exists) {
        // remove refresh token from user doc
        await userRef.update({
          refresh_tokens: admin.firestore.FieldValue.arrayRemove(refresh_token),
        });
      }
    }

    res.clearCookie("refresh_token");

    return res.status(400).json({ error: "Invalid token" });
  }
});

router.post("/logout", async (req, res) => {
  const { refresh_token } = req.cookies;

  console.log({ refresh_token });

  const decodedToken = jwt.decodeToken(refresh_token);

  console.log(decodedToken);

  const { uid } = decodedToken.payload;

  console.log({ uid });

  const userRef = firestore.collection("users").doc(uid);

  try {
    await userRef.update({
      refresh_tokens: admin.firestore.FieldValue.arrayRemove(refresh_token),
    });
  } catch (err) {
    console.error(err);
  } finally {
    res.clearCookie("refresh_token");
    res.json({ message: "logged out" });
  }
});

module.exports = router;
