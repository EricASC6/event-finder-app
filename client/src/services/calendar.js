import { AuthorizedService } from "./authorized";

const getEventsOnCalendar = () => {
  return AuthorizedService.get("/.netlify/functions/api/calendar").then(
    (res) => res.data.events
  );
};

const addEventToCalendar = (eventId) => {
  return AuthorizedService.post(`/.netlify/functions/api/calendar/${eventId}`);
};

const removeEventFromCalendar = (eventId) => {
  return AuthorizedService.delete(
    `/.netlify/functions/api/calendar/${eventId}`
  );
};

export const CalendarService = {
  getEventsOnCalendar,
  addEventToCalendar,
  removeEventFromCalendar,
};
