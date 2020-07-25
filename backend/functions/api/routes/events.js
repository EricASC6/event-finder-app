const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const { jwtAuth } = require("../middleware/jwtAuth");
const eventController = require("../controllers/event");
const queryParams = require("../services/queryParams");

const TICKET_MASTER_API_KEY = require("../keys/keys").TICKET_MASTER;
const TICKET_MASTER_API = "https://app.ticketmaster.com/discovery/v2";

const DEFAULT_QUERY_PARAMS = {
  apikey: TICKET_MASTER_API_KEY,
  countryCode: "US",
};

const createQueryString = (req, res, next) => {
  const query = Object.assign({}, req.query, DEFAULT_QUERY_PARAMS);
  const queryString = queryParams.createQueryString(query);

  req.queryString = queryString;

  return next();
};

router.use(jwtAuth());
router.use(createQueryString);

router.get("/", async (req, res) => {
  const q = eventController.getEvents(req.query);

  console.log({ q });

  const apiEndpoint = `${TICKET_MASTER_API}/events${req.queryString}`;
  console.log({ apiEndpoint });

  try {
    const response = await axios.get(apiEndpoint);
    const data = response.data;
    console.log({ data });

    const tmEvents = (data._embedded && data._embedded.events) || [];
    console.log({ tmEvents });
    const events = tmEvents.map((event) =>
      eventController.tranformTicketMasterEvent(event)
    );

    return res.json({ events });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const apiEndpoint = `${TICKET_MASTER_API}/events/${id}/${req.queryString}`;

  console.log({ apiEndpoint });

  try {
    const response = await axios.get(apiEndpoint);
    const data = response.data;

    const event = eventController.tranformTicketMasterEvent(data);

    return res.json({
      event,
    });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "Not found" });
  }
});

module.exports = router;
