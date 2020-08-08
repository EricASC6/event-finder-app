const express = require("express");
const router = express.Router();
const TicketMaster = require("../services/ticketMaster");
const venueController = require("../controllers/venue");
const { jwtAuth } = require("../middleware/jwtAuth");

router.use(jwtAuth());

router.get("/", (req, res) => {
  TicketMaster.getVenues(req.query)
    .then((venues) => res.json({ venues }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.get("/:venueId", async (req, res) => {
  const venueId = req.params.venueId;
  try {
    const venueData = await venueController.getVenueById(venueId);
    if (!venueData.exists) {
      return TicketMaster.getVenueById(venueId)
        .then((venue) => {
          venueController.saveVenue(venue);
          return res.json({ venue });
        })
        .catch((err) => res.status(400).json({ error: err.message }));
    }

    const venue = venueData.data();
    return res.json({ venue });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/:venueId/reviews", (req, res) => {
  const venueId = req.params.venueId;
  return venueController
    .getVenueReviews(venueId)
    .then((reviews) => res.json({ reviews }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.post("/:venueId/reviews", (req, res) => {
  const { stars, text } = req.body;
  const { uid, email } = req.user;
  const venueId = req.params.venueId;

  return venueController
    .writeVenueReview({ uid, email }, { stars, text }, venueId)
    .then((review) => res.json({ review }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

module.exports = router;
