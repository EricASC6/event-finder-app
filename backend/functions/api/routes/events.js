const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/jwtAuth");
const eventController = require("../controllers/event");
const bookmarkController = require("../controllers/bookmark");

router.use(jwtAuth());

router.get("/", async (req, res) => {
  const { uid } = req.user;

  try {
    const events = await eventController.getEvents(req.query);
    const userBookmark = await bookmarkController.getUserBookmark(uid);
    const bookmarkedEvents = userBookmark ? userBookmark.data().events : {};

    events.forEach(
      (event) => (event.bookmarked = Boolean(bookmarkedEvents[event.id]))
    );

    return res.json({ events });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Service Error" });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const event = await eventController.getEvent(id);
    const userBookmark = await bookmarkController.getUserBookmark(uid);
    const bookmarkedEvents = userBookmark ? userBookmark.data().events : {};

    event.bookmarked = Boolean(bookmarkedEvents[event.id]);

    return res.json({
      event,
    });
  } catch (err) {
    console.log("-----------Error!!!------------");
    console.error(err);

    return res.status(404).json({ error: "Not found" });
  }
});

module.exports = router;
