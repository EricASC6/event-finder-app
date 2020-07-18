const { admin } = require("../../admin");

const firestore = admin.firestore();

exports.isExisitingEvent = async (event) => {
  const { id } = event;

  const events = firestore.collection("events");
  const eventSnapshot = await events.doc(id).get();
  const exists = eventSnapshot.exists;

  return exists;
};

exports.saveEvent = (eventId, event) => {
  const events = firestore.collection("events");
  const eventRef = events.doc(eventId);
  return eventRef.set(event, { merge: true });
};
