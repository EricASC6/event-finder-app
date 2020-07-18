import React, { createContext, useEffect, useReducer } from "react";
import { getAccessToken } from "../services/auth";
import BookmarkService from "../services/bookmark";
import EventInfo from "../models/EventInfo";

const bookmarkService = new BookmarkService();

export const BookmarkContext = createContext();

// state -> bookmarks[]
const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BOOKMARKS": {
      const bookmarks = action.bookmarks;
      const newBookmarks = Object.assign({}, state.bookmarks);

      bookmarks.forEach((bookmark) => {
        const { id } = bookmark;
        const eventInfo = new EventInfo(bookmark);
        newBookmarks[id] = eventInfo;
      });

      console.log({ newBookmarks });

      return { ...state, bookmarks: newBookmarks };
    }
    case "BOOKMARK_EVENT": {
      const newBookmarks = Object.assign({}, state.bookmarks);
      const bookmarkedEvent = new EventInfo(action.event);
      newBookmarks[bookmarkedEvent.id] = bookmarkedEvent;

      console.log({ newBookmarks });

      return { ...state, bookmarks: newBookmarks };
    }
    case "UNBOOKMARK_EVENT": {
      const eventId = action.eventId;
      console.log({ eventId });

      const bookmarks = state.bookmarks;

      delete bookmarks[eventId];

      const newBookmarks = Object.assign({}, bookmarks);

      return {
        ...state,
        bookmarks: newBookmarks,
      };
    }
    default:
      return state;
  }
};

export const BookmarkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, { bookmarks: {} });

  useEffect(() => {
    const accessToken = getAccessToken();

    console.log({ accessToken });

    const fetchBookmarks = async () => {
      const response = await bookmarkService
        .setAccessToken(accessToken)
        .getBookmarkedEvents();

      console.log({ response });

      const bookmarks = response.data.bookmarks;

      return dispatch({
        type: "FETCH_BOOKMARKS",
        bookmarks,
      });
    };

    fetchBookmarks();
  }, []);

  const bookmarkEvent = (event) => {
    return bookmarkService.bookmarkEvent(event).then((data) =>
      dispatch({
        type: "BOOKMARK_EVENT",
        event: data.event,
      })
    );
  };

  const unbookmarkEvent = (eventId) => {
    return bookmarkService.unbookmarkEvent(eventId).then((data) =>
      dispatch({
        type: "UNBOOKMARK_EVENT",
        eventId,
      })
    );
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks: state.bookmarks, bookmarkEvent, unbookmarkEvent }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
