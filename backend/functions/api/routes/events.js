const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/jwtAuth");
const eventController = require("../controllers/event");

router.use(jwtAuth());

router.get("/", async (req, res) => {
  try {
    const events = await eventController.getEvents(req.query);
    console.log({ events });

    return res.json({ events });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Service Error" });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const event = await eventController.getEvent(id);

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
