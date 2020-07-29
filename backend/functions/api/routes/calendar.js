const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/jwtAuth");
const { cacheEvent } = require("../middleware/cacheEvent");

router.use(jwtAuth());

router.get("/", (req, res) => {
  res.send("Calendar");
});

router.post("/:eventId", cacheEvent(), (req, res) => {});

router.delete("/:eventId", (req, res) => {});

module.exports = router;
