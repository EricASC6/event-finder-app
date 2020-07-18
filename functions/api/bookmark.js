const { admin } = require("../admin");
const express = require("express");
const router = express.Router();
const { jwtAuth } = require("./middleware/jwtAuth");
const EventService = require("./services/event");
const BookmarkService = require("./services/bookmark");

// const firestore = admin.firestore();

router.use(jwtAuth());

router.get("/", async (req, res) => {
  const { uid } = req.user;
  const bookmarkedEvents = await BookmarkService.getBookmarkedEventsFromUser(
    uid
  );

  const bookmarks = bookmarkedEvents.map((event) =>
    Object.assign({}, event, { bookmarked: true })
  );

  return res.json({
    bookmarks,
  });
});

router.post("/", async (req, res) => {
  const { event } = req.body;
  const { uid } = req.user;

  console.log({ event });
  console.log({ uid });

  try {
    const existingEvent = await EventService.isExisitingEvent(event);
    if (!existingEvent) await EventService.saveEvent(event.id, event);

    await BookmarkService.bookmarkEvent(event, uid);

    const bookmarkedEvent = Object.assign({}, event, { bookmarked: true });

    return res.json({ event: bookmarkedEvent });
  } catch (err) {
    if (err.message === "Event already bookmarked")
      return res.status(400).json({
        error: err.message,
      });

    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { uid } = req.user;

  try {
    await BookmarkService.unbookmarkEvent(eventId, uid);

    return res.json({
      message: "Unbookmarked Event",
    });
  } catch (err) {
    if (err.message === "Can't unbookmark an event that is not bookmarked")
      return res.status(400).json({ error: err.message });

    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
