import { useAsync } from "./async.hook";
import { useState, useEffect } from "react";
import { EventsService } from "../services/events";
import { BookmarkService } from "../services/bookmark";
import { CalendarService } from "../services/calendar";
import { mapIdToObject } from "../helpers/mapIdToObject";
import moment from "moment";
import geohash from "ngeohash";

export const useEvents = ({
  classificationName = null,
  geoPoint = null,
  endDateTime = null,
  keyword = null,
  venueId = null,
} = {}) => {
  const options = {
    keyword,
    classificationName,
    geoPoint,
    endDateTime,
    venueId,
  };

  const [events, setEvents] = useState({});
  const { loading, error, execute: getEvents } = useAsync({
    fn: (options) => EventsService.getEvents(options),
    immediate: false,
    initLoading: true,
    onResolve: (evnts) => setEvents(mapIdToObject(evnts)),
  });

  useEffect(() => {
    const initEvents = (options) => getEvents(options);
    initEvents(options);
  }, [classificationName, geohash, endDateTime, keyword]);

  const setBookmarkStatus = (eventId, bookmarked = false) => {
    return setEvents((prevEvents) => {
      const newEvents = Object.assign({}, prevEvents);
      newEvents[eventId].bookmarked = bookmarked;
      return newEvents;
    });
  };

  const bookmarkEvent = (eventId) => {
    // Optimistic UI Rendering
    setBookmarkStatus(eventId, true);
    return BookmarkService.bookmarkEvent(eventId).catch(() =>
      setBookmarkStatus(eventId, false)
    );
  };

  const unbookmarkEvent = (eventId) => {
    setBookmarkStatus(eventId, false);
    return BookmarkService.unbookmarkEvent(eventId).catch(() =>
      setBookmarkStatus(eventId, true)
    );
  };

  return {
    loading,
    error,
    events: Object.values(events),
    bookmarkEvent,
    unbookmarkEvent,
  };
};

export const useEventsByCategory = (category) => {
  const eventsState = useEvents({
    classificationName: category,
  });

  return eventsState;
};

export const useUpcomingEvents = (daysFromToday = 3) => {
  const today = new Date();
  const future = new Date(today);
  future.setDate(future.getDate() + daysFromToday);

  const endDateTime = moment(future).format("YYYY-MM-DDTHH:mm:ssZ");

  const eventsState = useEvents({ endDateTime });

  return eventsState;
};

export const useEventsByLocation = (lng, lat) => {
  const hash = geohash.encode(lat, lng);

  const eventsState = useEvents({ geoPoint: hash });

  return eventsState;
};

export const useEventsByVenueId = (venueId) => {
  const eventsState = useEvents({ venueId });
  return eventsState;
};

export const useEvent = (eventId) => {
  console.log({ eventId });

  const [event, setEvent] = useState({});
  const { loading, error, execute: getEvent } = useAsync({
    fn: (eventId) => EventsService.getEvent(eventId),
    immediate: false,
    initLoading: true,
    onResolve: (evnt) => setEvent(evnt),
  });

  useEffect(() => {
    const initEvent = (eventId) => {
      getEvent(eventId);
    };

    initEvent(eventId);
  }, [eventId]);

  const setBookmarkStatus = (bookmarked = false) => {
    const newEvent = Object.assign({}, event);
    newEvent.bookmarked = bookmarked;
    setEvent(newEvent);
  };

  const bookmarkEvent = () => {
    setBookmarkStatus(true);
    return BookmarkService.bookmarkEvent(eventId).catch(() =>
      setBookmarkStatus(false)
    );
  };

  const unbookmarkEvent = () => {
    setBookmarkStatus(false);
    return BookmarkService.unbookmarkEvent(eventId).catch(() =>
      setBookmarkStatus(true)
    );
  };

  const setAddedToCalendarStatus = (added = false) => {
    const newEvent = Object.assign({}, event);
    newEvent.addedToCalendar = added;
    setEvent(newEvent);
  };

  const addToCalendar = () => {
    setAddedToCalendarStatus(true);
    return CalendarService.addEventToCalendar(eventId).catch(() =>
      setAddedToCalendarStatus(false)
    );
  };

  const removeFromCalendar = () => {
    setAddedToCalendarStatus(false);
    return CalendarService.removeEventFromCalendar(eventId).catch(() =>
      setAddedToCalendarStatus(true)
    );
  };

  return {
    loading,
    error,
    event,
    bookmarkEvent,
    unbookmarkEvent,
    addToCalendar,
    removeFromCalendar,
  };
};

export const useBookmarkedEvents = () => {
  const [events, setEvents] = useState({});

  const { loading, error, execute: getBookmarkedEvents } = useAsync({
    fn: () => BookmarkService.getBookmarkedEvents(),
    immediate: false,
    initLoading: true,
    onResolve: (evnts) => setEvents(mapIdToObject(evnts)),
  });

  useEffect(() => {
    const initBookmarkedEvents = () => getBookmarkedEvents();
    initBookmarkedEvents();
  }, []);

  const unbookmarkEvent = (eventId) => {
    const eventsCopy = Object.assign({}, events);

    setEvents(() => {
      const newEvents = Object.assign({}, events);
      delete newEvents[eventId];
      return newEvents;
    });

    return BookmarkService.unbookmarkEvent(eventId).catch(() =>
      setEvents(eventsCopy)
    );
  };

  return { loading, error, events: Object.values(events), unbookmarkEvent };
};

export const useEventsOnCalendar = () => {
  const [events, setEvents] = useState({});

  const { loading, error, execute: getEventsOnCalendar } = useAsync({
    fn: () => CalendarService.getEventsOnCalendar(),
    immediate: false,
    initLoading: true,
    onResolve: (evnts) => setEvents(mapIdToObject(evnts)),
  });

  useEffect(() => {
    const initBookmarkedEvents = () => getEventsOnCalendar();
    initBookmarkedEvents();
  }, []);

  return { loading, error, events: Object.values(events) };
};
