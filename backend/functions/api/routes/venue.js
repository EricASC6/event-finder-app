const express = require("express");
const router = express.Router();
const TicketMaster = require("../services/ticketMaster");
const { jwtAuth } = require("../middleware/jwtAuth");

router.use(jwtAuth());

router.get("/", (req, res) => {
  TicketMaster.getVenues(req.query)
    .then((venues) => res.json({ venues }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.get("/:venueId", (req, res) => {
  const venueId = req.params.venueId;
  return TicketMaster.getVenueById(venueId)
    .then((venue) => res.json({ venue }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

module.exports = router;
