const functions = require("firebase-functions");
const { admin } = require("../admin");

const firestore = admin.firestore();

exports.onUserCreated = functions.auth.user().onCreate((user, context) => {
  console.log({ user });
  const { displayName, email, uid } = user;

  return firestore.collection("users").doc(uid).set({ displayName, email });
});
