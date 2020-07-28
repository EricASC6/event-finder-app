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

  try {
    const isExistingEvent = await eventController.isExistingEvent(eventId);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  res.send(isExistingEvent);
});

module.exports = router;
