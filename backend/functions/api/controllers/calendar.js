const admin = require("../admin/admin");
const eventsController = require("../controllers/event");

const FieldValue = admin.firestore.FieldValue;
const firestore = admin.firestore();

exports.getUserCalendar = async (uid) => {
  const calendarsRef = firestore
    .collection("calendars")
    .where("userId", "==", uid);
  const snapshots = await calendarsRef.get();
  const snapshot = !snapshots.empty ? snapshots.docs[0] : null;
  return snapshot;
};

exports.getAddedToCalendarEvents = async (uid) => {
  const userCalendar = await this.getUserCalendar(uid);
  const calendarData = (userCalendar && userCalendar.data()) || {};
  const eventIds = Object.keys(calendarData.events || {});

  const calendarEvents = await eventsController.getEventsByIds(eventIds);
  calendarEvents.forEach((e) => (e.addedToCalendar = true));

  return calendarEvents;
};

exports.addEventToCalendar = async (uid, eventId) => {
  const calendarSnapshot = await this.getUserCalendar(uid);
  if (calendarSnapshot) {
    const events = calendarSnapshot.data().events;
    if (events[eventId]) {
      throw new Error("Event already added to calendar");
    }

    const calendarRef = calendarSnapshot.ref;
    const eventKey = `events.${eventId}`;
    return calendarRef.update({
      [eventKey]: true,
    });
  } else {
    const newCalendar = firestore.collection("calendars").doc();

    return newCalendar.set({
      userId: uid,
      events: {
        [eventId]: true,
      },
    });
  }
};

exports.removeEventFromCalendar = async (uid, eventId) => {
  const calendarSnapshot = await this.getUserCalendar(uid);
  if (!calendarSnapshot) {
    throw new Error("Event not added to calendar");
  }

  const bookmarkedEvents = calendarSnapshot.data().events;
  const eventBookmarked = bookmarkedEvents[eventId];

  if (!eventBookmarked) {
    throw new Error("Event not added to calendar");
  }

  const eventField = `events.${eventId}`;
  return calendarSnapshot.ref.update({
    [eventField]: FieldValue.delete(),
  });
};
