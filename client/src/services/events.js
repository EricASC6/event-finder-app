import { AuthorizedService } from "./authorized";
import { combineApiWithQueryParams } from "../utils/utils.api";

const getEvents = async (options = {}) => {
  const api = combineApiWithQueryParams(
    "/.netlify/functions/api/events",
    options
  );

  console.log("event service options ", options);
  console.log({ api });

  try {
    const response = await AuthorizedService.get(api);
    const events = response.data.events;
    return events;
  } catch (err) {
    throw err;
  }
};

const getEvent = async (eventId) => {
  const api = `/.netlify/functions/api/events/${eventId}`;

  console.log({ api });

  try {
    const response = await AuthorizedService.get(api);
    const event = response.data.event;
    return event;
  } catch (err) {
    throw err;
  }
};

export const EventsService = {
  getEvents,
  getEvent,
};
