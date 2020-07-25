import { useAsync } from "./async.hook";
import { useState, useEffect } from "react";
import { EventsService } from "../services/events";
import moment from "moment";
import geohash from "ngeohash";

export const useEvents = ({
  classificationName = null,
  geohash = null,
  endDateTime = null,
  keyword = null,
} = {}) => {
  const options = { keyword, classificationName, geohash, endDateTime };

  const [events, setEvents] = useState([]);
  const { loading, error, execute: getEvents } = useAsync({
    fn: (options) => EventsService.getEvents(options),
    immediate: false,
    initLoading: true,
  });

  useEffect(() => {
    initEvents(options);
  }, [classificationName, geohash, endDateTime]);

  const initEvents = (options) =>
    getEvents(options).then((evnts) => {
      // console.log("After execute");
      // console.log({ evnts });
      setEvents(evnts);
    });

  const bookmarkEvent = (eventId) => {
    return setEvents((prevEvents) => {
      const newEvents = [...prevEvents];
      const event = newEvents.find((e) => e.id === eventId);
      if (!event.bookmarked) event.bookmarked = true;

      return newEvents;
    });
  };

  const unbookmarkEvent = (eventId) => {
    return setEvents((prevEvents) => {
      const newEvents = [...prevEvents];
      const event = newEvents.find((e) => e.id === eventId);
      if (event.bookmarked) event.bookmarked = false;

      return newEvents;
    });
  };

  return { loading, error, events, bookmarkEvent, unbookmarkEvent };
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

export const useEvent = (eventId) => {
  console.log({ eventId });

  const [event, setEvent] = useState({});
  const { loading, error, execute: getEvent } = useAsync({
    fn: (eventId) => EventsService.getEvent(eventId),
    immediate: false,
    initLoading: true,
  });

  useEffect(() => {
    initEvent(eventId);
  }, [eventId]);

  const initEvent = (eventId) => {
    getEvent(eventId).then((evnt) => {
      // console.log("After execute");
      // console.log({ evnt });

      setEvent(evnt);
    });
  };

  return { loading, error, event };
};
