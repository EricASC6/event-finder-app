import { AuthorizedService } from "./authorized";

const getBookmarkedEvents = () => {
  return AuthorizedService.get(`/.netlify/functions/api/bookmarks`).then(
    (res) => res.data.events
  );
};

const bookmarkEvent = (eventId) => {
  return AuthorizedService.post(`/.netlify/functions/api/bookmarks/${eventId}`);
};

const unbookmarkEvent = (eventId) => {
  return AuthorizedService.delete(
    `/.netlify/functions/api/bookmarks/${eventId}`
  );
};

export const BookmarkService = {
  getBookmarkedEvents,
  bookmarkEvent,
  unbookmarkEvent,
};
