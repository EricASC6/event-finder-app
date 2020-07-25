const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/jwtAuth");
const eventController = require("../controllers/event");

router.use(jwtAuth());
router.get("/", (req, res) => {
  res.send("Bookmarks");
});

router.post("/:eventId", async (req, res) => {
  const { eventId } = req.params;

  const isExistingEvent = await eventController.isExistingEvent(eventId);

  res.send(isExistingEvent);
});

module.exports = router;
