import { useAsync } from "./async.hook";
import { useFetch } from "./fetch.hook";
import { useState, useEffect } from "react";
import { EventsService } from "../services/events";
import moment from "moment";
import geohash from "ngeohash";

export const useEvents = ({
  classificationName = null,
  geohash = null,
  endDateTime = null,
} = {}) => {
  const options = { classificationName, geohash, endDateTime };

  const [events, setEvents] = useState([]);
  const { loading, error, execute } = useAsync(
    () => EventsService.getEvents(options),
    false
  );

  useEffect(() => {
    initEvents(options);
  }, [classificationName, geohash, endDateTime]);

  const initEvents = (options) =>
    execute(options).then((evnts) => {
      console.log("After execute");
      console.log({ evnts });
      setEvents(evnts);
    });

  return { loading, error, events };
};

export const useEventsByCategory = (category) => {
  const { loading, error, events } = useEvents({
    classificationName: category,
  });

  return { loading, error, events };
};

export const useUpcomingEvents = (daysFromToday = 3) => {
  const today = new Date();
  const future = new Date(today);
  future.setDate(future.getDate() + daysFromToday);

  const endDateTime = moment(future).format("YYYY-MM-DDTHH:mm:ssZ");

  const { loading, error, events } = useEvents({ endDateTime });

  return { loading, error, events };
};

export const useEventsByLocation = (lng, lat) => {
  const hash = geohash.encode(lat, lng);

  const { loading, error, events } = useEvents({ geoPoint: hash });

  return { loading, error, events };
};

export const useEvent = (id) => {
  const api = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=7Y47X2uiPCSAp6XAJZG684wI2GzOJHUT`;

  const { loading, error, response: event } = useFetch(api);

  return { loading, error, event };
};
