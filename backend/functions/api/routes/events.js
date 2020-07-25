const express = require("express");
const router = express.Router();
const fetch = require("node-fetch").default;
const { jwtAuth } = require("../middleware/jwtAuth");
const eventController = require("../controllers/event");
const queryParams = require("../services/queryParams");

const TICKET_MASTER_API_KEY = require("../keys/keys").TICKET_MASTER;
const TICKET_MASTER_API = "https://app.ticketmaster.com/discovery/v2";

const DEFAULT_QUERY_PARAMS = { apikey: TICKET_MASTER_API_KEY };

const createQueryString = (req, res, next) => {
  const query = Object.assign({}, req.query, DEFAULT_QUERY_PARAMS);
  const queryString = queryParams.createQueryString(query);

  req.queryString = queryString;

  return next();
};

// router.use(jwtAuth());
router.use(createQueryString);

router.get("/", async (req, res) => {
  const apiEndpoint = `${TICKET_MASTER_API}/events${req.queryString}`;
  try {
    const response = await fetch(apiEndpoint);
    const json = await response.json();

    const tmEvents = json._embedded.events;
    const events = tmEvents.map((event) =>
      eventController.tranformTicketMasterEvent(event)
    );

    // console.log({ events });

    return res.json({
      events,
    });
  } catch (err) {
    return res.status(404).json({ message: "Not found" });
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const apiEndpoint = `${TICKET_MASTER_API}/events/${id}/${req.queryString}`;

  return res.json({ id: id });
  // try {
  //   const response = await fetch(apiEndpoint);
  //   const json = await response.json();

  //   console.log({ json });

  //   const event = eventController.tranformTicketMasterEvent(json);

  //   return res.json({
  //     event: event,
  //   });
  // } catch (err) {
  //   return res.status(404).json({ error: "Not found" });
  // }
});

module.exports = router;
