import { AuthorizedService } from "./authorized";
import { combineApiWithQueryParams } from "../utils/utils.api";

const getVenues = (options = {}) => {
  const api = combineApiWithQueryParams(
    "/.netlify/functions/api/venues",
    options
  );

  return AuthorizedService.get(api).then((res) => res.data.venues);
};

const getVenue = (venueId) => {
  return AuthorizedService.get(
    `/.netlify/functions/api/venues/${venueId}`
  ).then((res) => res.data.venue);
};

export const VenueService = {
  getVenues,
  getVenue,
};
