import { useReducer } from "react";
import { useFetch } from "./fetch.hook";
import { useBookmark } from "./bookmark.hook";
import { KEYS } from "../keys/keys";
import { combineApiWithQueryParams } from "../utils/utils.api";
import { EVENT_CATEGORY } from "../enums/eventsCategory";
import EventInfo from "../models/EventInfo";
import moment from "moment";
import geohash from "ngeohash";

export const useEventsOptions = (
  initOptions = { keyword: "", classificationName: EVENT_CATEGORY.All }
) => {
  const reducer = (options, action) => {
    switch (action.type) {
      case "KEY_WORD": {
        const { value } = action;
        return Object.assign({}, options, { keyword: value });
      }
      case "CLASSIFICATION_NAME": {
        const { value } = action;
        return Object.assign({}, options, { classificationName: value });
      }
      default:
        return options;
    }
  };

  const [options, dispatch] = useReducer(reducer, initOptions);

  return { options, dispatch };
};

export const useEvents = (options = {}) => {
  const api = combineApiWithQueryParams(
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${KEYS.TICKET_MASTER}`,
    options
  );

  const { map: bookmarksMap } = useBookmarkedEvents();
  const { loading, error, response } = useFetch(api);

  const events = (response && response?._embedded?.events) || [];
  // console.log(events);

  const eventInfos = events.map((event) => {
    const eventInfo =
      bookmarksMap[event.id] ||
      EventInfo.transformTMApiDataIntoEventInfo(event);

    return eventInfo;
  });

  // console.log({ eventInfos });

  return { loading, error, events: eventInfos || [] };
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
  const api = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${KEYS.TICKET_MASTER}`;

  const { loading, error, response: event } = useFetch(api);

  return { loading, error, event };
};

export const useBookmarkedEvents = () => {
  const { bookmarks } = useBookmark();

  return {
    map: bookmarks,
    array: Object.values(bookmarks),
  };
};
