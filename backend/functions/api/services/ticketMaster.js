const queryParams = require("./queryParams");
const Venue = require("../models/venue");
const axios = require("axios").default;

const TICKET_MASTER_API_KEY = require("../keys/keys").TICKET_MASTER;
const TICKET_MASTER_API = "https://app.ticketmaster.com/discovery/v2";

const DEFAULT_QUERY_PARAMS = {
  apikey: TICKET_MASTER_API_KEY,
  countryCode: "US",
};

exports.getVenues = (options = {}) => {
  const query = queryParams.createQueryString({
    ...options,
    ...DEFAULT_QUERY_PARAMS,
  });

  return axios.get(`${TICKET_MASTER_API}/venues${query}`).then((res) => {
    const _venues = res.data._embedded.venues || [];
    const venues = _venues.map((venue) =>
      Venue.createVenueFromTicketMaster(venue)
    );
    return venues;
  });
};

exports.getVenueById = (venueId) => {
  const query = queryParams.createQueryString(DEFAULT_QUERY_PARAMS);

  return axios
    .get(`${TICKET_MASTER_API}/venues/${venueId}${query}`)
    .then((res) => Venue.createVenueFromTicketMaster(res.data));
};
