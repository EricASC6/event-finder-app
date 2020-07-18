const { admin } = require("../../admin");

const firestore = admin.firestore();

exports.getBookmarkByUid = async (uid) => {
  const bookmarksRef = firestore.collection("bookmarks");

  // get the bookmark doc that belongs to the user with uid
  const bookmarksSnapshot = await bookmarksRef.where("userId", "==", uid).get();
  const isEmpty = bookmarksSnapshot.empty;
  if (isEmpty) {
    // if user has no bookmarks, create a doc ref
    return { ref: bookmarksRef.doc(), data: {} };
  }

  // ge the ref and data from the queries bookmark snapshot
  const bookmarkSnapshot = bookmarksSnapshot.docs[0];
  const bookmarkRef = bookmarkSnapshot.ref;
  const bookmarkData = bookmarkSnapshot.data();

  return { ref: bookmarkRef, data: bookmarkData };
};

exports.bookmarkEvent = async (event, uid) => {
  const { ref: bookmarkRef, data: bookmark } = await this.getBookmarkByUid(uid);

  // check if bookmark already exists
  const eventAlreadyBookmarked = Boolean(
    bookmark.events && bookmark.events[event.id]
  );

  console.log({ eventAlreadyBookmarked });

  if (eventAlreadyBookmarked) {
    throw new Error("Event already bookmarked");
  }

  const emptyBookmark = Object.entries(bookmark).length === 0;

  if (emptyBookmark) {
    return bookmarkRef.set({
      userId: uid,
      events: {
        [event.id]: true,
      },
    });
  } else {
    const bookmarksPath = `events.${event.id}`;
    return bookmarkRef.update({
      [bookmarksPath]: true,
    });
  }
};

exports.unbookmarkEvent = async (eventId, uid) => {
  const { ref: bookmarkRef, data: bookmark } = await this.getBookmarkByUid(uid);

  const alreadyBookmarked = Boolean(
    bookmark.events && bookmark.events[eventId]
  );

  // handle unbookmarking an event that is not bookmarked
  if (!alreadyBookmarked)
    throw new Error("Can't unbookmark an event that is not bookmarked");

  const eventIdPath = `events.${eventId}`;

  return bookmarkRef.update({
    [eventIdPath]: admin.firestore.FieldValue.delete(),
  });
};

exports.getBookmarkedEventsFromUser = async (uid) => {
  const bookmarkRef = firestore.collection("bookmarks");
  const eventsRef = firestore.collection("events");

  const bookmarksSnapshot = await bookmarkRef.where("userId", "==", uid).get();
  const isEmpty = bookmarksSnapshot.empty;
  if (isEmpty) return [];

  const bookmark = bookmarksSnapshot.docs[0].data();
  const boomarkedEventIds = Object.keys(bookmark.events);

  if (boomarkedEventIds.length === 0) return [];

  const eventsSnapshot = await eventsRef
    .where("id", "in", boomarkedEventIds)
    .get();
  const events = eventsSnapshot.docs.map((doc) => doc.data());
  return events;
};
