import { AuthorizedService } from "./authorized";

const getEventsOnCalendar = () => {
  return AuthorizedService.get("/.netlify/functions/api/calendar").then(
    (res) => res.data.events
  );
};

const addEventToCalendar = (eventId) => {};

const removeEventFromCalendar = (eventId) => {};

export const CalendarService = {
  getEventsOnCalendar,
  addEventToCalendar,
  removeEventFromCalendar,
};
