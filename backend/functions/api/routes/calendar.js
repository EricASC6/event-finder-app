const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/jwtAuth");
const { cacheEvent } = require("../middleware/cacheEvent");
const calendarController = require("../controllers/calendar");

router.use(jwtAuth());

router.get("/", (req, res) => {
  const { uid } = req.user;

  return calendarController
    .getAddedToCalendarEvents(uid)
    .then((events) => res.json({ events }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.post("/:eventId", cacheEvent(), (req, res) => {
  const eventId = req.params.eventId;
  const { uid } = req.user;

  return calendarController
    .addEventToCalendar(uid, eventId)
    .then(() => res.json({ message: "Added to calendar" }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.delete("/:eventId", (req, res) => {
  const eventId = req.params.eventId;
  const { uid } = req.user;

  return calendarController
    .removeEventFromCalendar(uid, eventId)
    .then(() => res.json({ message: "Removed from calendar" }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

module.exports = router;
