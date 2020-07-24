import { AuthorizedService } from "./authorized";
import { combineApiWithQueryParams } from "../utils/utils.api";

const getEvents = async (options = {}) => {
  const api = combineApiWithQueryParams(
    "http://localhost:8888/.netlify/functions/api/events",
    options
  );

  try {
    const response = await AuthorizedService.get(api);
    const events = response.data.events;
    return events;
  } catch (err) {
    throw err;
  }
};

export const EventsService = {
  getEvents,
};
