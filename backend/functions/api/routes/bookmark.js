const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/jwtAuth");
const eventController = require("../controllers/event");
const bookmarkController = require("../controllers/bookmark");

router.use(jwtAuth());
router.get("/", async (req, res) => {
  const { uid } = req.user;

  try {
    const bookmarkedEvents = await bookmarkController.getUserBookmarkedEvents(
      uid
    );
    return res.json({ events: bookmarkedEvents });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:eventId", async (req, res) => {
  const { eventId } = req.params;

  console.log({ eventId });
  console.log(req.user);
  const { uid } = req.user;

  try {
    const isExistingEvent = await eventController.isExistingEvent(eventId);
    console.log({ isExistingEvent });

    if (!isExistingEvent) {
      const event = await eventController.getEventFromTicketMaster(eventId);
      await eventController.saveEvent(event);
    }

    return bookmarkController
      .bookmarkEvent(uid, eventId)
      .then(() => res.json({ message: "Bookmarked Event" }))
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  console.log({ eventId });

  const { uid } = req.user;
  console.log({ uid });

  try {
    return bookmarkController
      .unbookmarkEvent(uid, eventId)
      .then(() => res.json({ message: "Unbookmarked Event" }))
      .catch((error) => res.status(400).json({ error: error.message }));
  } catch (error) {
    return res.status(500).json({ error: "Interal Server Error" });
  }
});

module.exports = router;
