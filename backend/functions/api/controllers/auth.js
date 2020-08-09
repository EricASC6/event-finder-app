const admin = require("../admin/admin");
const jwt = require("../services/jwt");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "123";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "456";

const firestore = admin.firestore();
const usersRef = firestore.collection("users");

exports.verifyIdToken = (idToken) => {
  return admin.auth().verifyIdToken(idToken);
};

exports.createUserPayloadForJwt = async (decodedToken) => {
  const { uid, email } = decodedToken;

  const userRef = usersRef.doc(uid);

  try {
    const userDoc = await userRef.get();
    const user = userDoc.data();
    const payload = { email: user.email, uid };

    return payload;
  } catch (err) {
    return { uid, email };
  }
};

exports.createAccessTokenForUser = (payload) => {
  return jwt.createToken(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "5h",
  });
};

exports.validateAccessToken = async (accessToken) => {
  try {
    const decodedToken = await jwt.verifyToken(
      accessToken,
      ACCESS_TOKEN_SECRET
    );

    return decodedToken;
  } catch (err) {
    throw err;
  }
};

exports.createRefreshTokenForUser = (payload) => {
  return jwt.createToken(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "30 days",
  });
};

exports.validateRefreshToken = async (refreshToken) => {
  try {
    const decodedToken = await jwt.verifyToken(
      refreshToken,
      REFRESH_TOKEN_SECRET
    );

    const { uid } = decodedToken;

    const userRef = usersRef.doc(uid);
    const userDoc = await userRef.get();
    const user = userDoc.data();
    const refreshTokens = user.refresh_tokens || [];
    const validToken = refreshTokens.includes(refreshToken);
    if (!validToken) throw new Error("Invalid Refresh Token");

    return decodedToken;
  } catch (err) {
    throw err;
  }
};

exports.revokeRefreshTokenFromUser = async (uid, refreshToken) => {
  const userRef = usersRef.doc(uid);

  try {
    await userRef.update({
      refresh_tokens: admin.firestore.FieldValue.arrayRemove(refreshToken),
    });
  } catch (err) {
    throw err;
  }
};

exports.storeNewRefreshToken = async (uid, refreshToken) => {
  const userRef = usersRef.doc(uid);

  try {
    await userRef.set(
      {
        refresh_tokens: admin.firestore.FieldValue.arrayUnion(refreshToken),
      },
      { merge: true }
    );
  } catch (err) {
    throw err;
  }
};
