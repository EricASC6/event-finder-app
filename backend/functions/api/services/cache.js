const admin = require("../admin/admin");
const firestore = admin.firestore();

const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

// onExpired has to be an async function
exports.fromFirestoreCache = async (
  collectionName,
  docId,
  onExpired = async () => {}
) => {
  const docRef = firestore.collection(collectionName).doc(docId);
  const snapshot = await docRef.get();
  const data = snapshot.data();
  const exp = (data && data.__exp.toDate().getTime()) || 0;
  console.log({ exp });

  const expired = Date.now() > exp;
  if (expired) {
    console.log("----expired cached value----");

    const newValue = await onExpired();
    await this.saveToFirestoreCache(collectionName, docId, newValue);

    return newValue;
  }

  console.log("----getting cached value-----");

  return data;
};

exports.saveToFirestoreCache = (
  collectionName,
  docId,
  data,
  expiration = TWO_DAYS
) => {
  const exp = new Date(new Date().getTime() + expiration);
  const value = { ...data, __exp: exp };

  return firestore
    .collection(collectionName)
    .doc(docId)
    .set(value, { merge: true });
};
