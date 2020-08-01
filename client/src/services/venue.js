import { AuthorizedService } from "./authorized";
import { combineApiWithQueryParams } from "../utils/utils.api";

const getVenues = (options = {}) => {
  const api = combineApiWithQueryParams(
    "/.netlify/functions/api/venues",
    options
  );

  return AuthorizedService.get(api).then((res) => res.data.venues);
};

export const VenueService = {
  getVenues,
};
