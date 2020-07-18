import Http from "./http";

const http = new Http({ credentials: "include" });

export default class BookmarkService {
  constructor() {
    this.accessToken = null;
    this.authorizationToken = null;
    this.authHeader = {};
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
    this.authorizationToken = `Bearer ${this.accessToken}`;
    this.authHeader = {
      headers: {
        Authorization: this.authorizationToken,
      },
    };

    return this;
  }

  getBookmarkedEvents() {
    return http.get(
      "http://localhost:5001/event-finder-875e8/us-central1/api/bookmarks",
      this.authHeader
    );
  }

  getBookmarkedIds() {
    return http.get(
      "http://localhost:5001/event-finder-875e8/us-central1/api/bookmarks/ids",
      this.authHeader
    );
  }

  bookmarkEvent(event) {
    return http
      .post(
        "http://localhost:5001/event-finder-875e8/us-central1/api/bookmarks",
        { event },
        this.authHeader
      )
      .then((res) => res.data);
  }

  unbookmarkEvent(eventId) {
    return http
      .delete(
        `http://localhost:5001/event-finder-875e8/us-central1/api/bookmarks/${eventId}`,
        {},
        this.authHeader
      )
      .then((res) => res.data);
  }
}
