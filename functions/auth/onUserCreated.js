const functions = require("firebase-functions");
const { firestore } = require("../admin");

exports.onUserCreated = functions.auth.user().onCreate((user, context) => {
  console.log(user);
  const { displayName, email, uid } = user;

  return firestore.collection("users").doc(uid).set({ displayName, email });
});
