import { AuthorizedService } from "./authorized";

const getBookmarkedEvents = () => {};

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
