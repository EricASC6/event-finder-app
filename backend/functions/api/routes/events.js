const express = require("express");
const router = express.Router();
const fetch = require("node-fetch").default;
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

router.use(createQueryString);

router.get("/", async (req, res) => {
  console.log("Yooo");

  console.log(req.baseUrl);

  const apiEndpoint = `${TICKET_MASTER_API}/events${req.queryString}`;
  const response = await fetch(apiEndpoint);
  const json = await response.json();

  res.json({
    events: json,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const apiEndpoint = `${TICKET_MASTER_API}/events/${id}${req.queryString}`;
  const response = await fetch(apiEndpoint);
  const json = await response.json();

  res.json({
    event: json,
  });
});

module.exports = router;
