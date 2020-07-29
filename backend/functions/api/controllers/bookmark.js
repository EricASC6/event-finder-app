const admin = require("../admin/admin");

const firestore = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

exports.getUserBookmark = async (uid) => {
  const bookmarksRef = firestore
    .collection("bookmarks")
    .where("userId", "==", uid);
  const bookmarkSnapshots = await bookmarksRef.get();
  const snapshot = !bookmarkSnapshots.empty ? bookmarkSnapshots.docs[0] : null;
  return snapshot;
};

exports.bookmarkEvent = async (uid, eventId) => {
  const bookmarkSnapshot = await this.getUserBookmark(uid);
  if (bookmarkSnapshot) {
    const events = bookmarkSnapshot.data().events;
    if (events[eventId]) {
      throw new Error("Event already bookmarked");
    }

    const bookmarkRef = bookmarkSnapshot.ref;
    const eventKey = `events.${eventId}`;
    return bookmarkRef.update({
      [eventKey]: true,
    });
  } else {
    const newBookmark = firestore.collection("bookmarks").doc();

    return newBookmark.set({
      userId: uid,
      events: {
        [eventId]: true,
      },
    });
  }
};

exports.unbookmarkEvent = async (uid, eventId) => {
  const bookmarkSnapshot = await this.getUserBookmark(uid);
  if (!bookmarkSnapshot) {
    throw new Error("Event not bookmarked");
  }

  const bookmarkedEvents = bookmarkSnapshot.data().events;
  const eventBookmarked = bookmarkedEvents[eventId];

  if (!eventBookmarked) {
    throw new Error("Event not bookmarked");
  }

  const eventField = `events.${eventId}`;
  return bookmarkSnapshot.ref.update({
    [eventField]: FieldValue.delete(),
  });
};
