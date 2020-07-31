const admin = require("../admin/admin");
const axios = require("axios").default;
const moment = require("moment");
const queryParams = require("../services/queryParams");

const firestore = admin.firestore();

const TICKET_MASTER_API_KEY = require("../keys/keys").TICKET_MASTER;
const TICKET_MASTER_API = "https://app.ticketmaster.com/discovery/v2";

const DEFAULT_QUERY_PARAMS = {
  apikey: TICKET_MASTER_API_KEY,
  countryCode: "US",
};

class Event {
  constructor({
    id,
    name,
    image,
    date = {
      month: "",
      day: "",
      week: "",
    },
    duration = {
      startTime: "",
      endTime: "",
    },
    description,
    category,
    location = {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      coordinates: "",
    },
    minPrice,
    maxPrice,
    url,
    bookmarked = false,
    addedToCalendar = false,
  }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.date = date;
    this.duration = duration;
    this.description = description;
    this.category = category;
    this.location = location;
    this.priceRanges = {
      minPrice,
      maxPrice,
    };
    this.url = url;
    this.bookmarked = bookmarked;
    this.addedToCalendar = addedToCalendar;
  }
}

const EventConverter = {
  toFirestore: (event) => {
    const { bookmarked, addedToCalendar, ...rest } = event;
    return { ...rest };
  },
  fromFirestore: (snapshot, options) => {
    const event = snapshot.data(options);
    return new Event({ ...event });
  },
};

exports.tranformTicketMasterEvent = (event) => {
  // console.log({ event });

  const {
    id,
    name,
    images,
    _embedded,
    dates,
    description: _description,
    priceRanges,
    classifications,
    url,
  } = event;

  const image = images.find((img) => img.ratio === "16_9" && img.width > 288)
    .url;

  const [month, day, week] = moment(dates.start.dateTime)
    .format("MMM D dddd")
    .split(" ");
  const date = { month, day, week };

  const { start, end } = dates;
  const startTime = start ? moment(start.dateTime).format("h:mm: A") : "N/A";
  const endTime = end ? moment(end.dateTime).format("h:mm: A") : "N/A";
  const duration = { startTime, endTime };

  const description = _description || "No info for this event";

  const category = classifications ? classifications[0].segment.name : "N/A";
  const {
    address: _address,
    city,
    state,
    postalCode,
    location: coordinates,
  } = _embedded.venues[0];

  const address = `${_address.line1} ${city.name}, ${state.name} ${postalCode}`;
  const location = {
    address: address,
    city: city.name,
    state: state.name,
    postalCode,
    coordinates,
  };

  const _priceRanges = priceRanges && priceRanges[0];
  const { min: minPrice = 0, max: maxPrice = 0 } = _priceRanges || {};

  return new Event({
    id,
    name,
    image,
    date,
    duration,
    description,
    category,
    location,
    minPrice,
    maxPrice,
    url,
  });
};

exports.isExistingEvent = async (eventId) => {
  const eventRef = firestore.collection("events").doc(eventId);
  const eventSnapshot = await eventRef.get();
  const exists = eventSnapshot.exists;
  return exists;
};

exports.getEventsFromTicketMaster = (options = {}) => {
  const query = queryParams.createQueryString({
    ...options,
    ...DEFAULT_QUERY_PARAMS,
  });

  const apiEndpoint = `${TICKET_MASTER_API}/events${query}`;
  console.log({ apiEndpoint });

  return axios.get(apiEndpoint).then((res) => {
    const data = res.data;
    const tmEvents = (data._embedded && data._embedded.events) || [];
    const events = tmEvents.map((event) =>
      this.tranformTicketMasterEvent(event)
    );

    return events;
  });
};

exports.getEventFromTicketMaster = (eventId) => {
  const query = queryParams.createQueryString(DEFAULT_QUERY_PARAMS);
  const apiEndpoint = `${TICKET_MASTER_API}/events/${eventId}${query}`;

  console.log({ apiEndpoint });

  return axios.get(apiEndpoint).then((res) => {
    const data = res.data;
    const event = this.tranformTicketMasterEvent(data);
    console.log({ event });

    return event;
  });
};

exports.getEventById = (eventId) => {
  return firestore
    .collection("events")
    .doc(eventId)
    .withConverter(EventConverter)
    .get()
    .then((event) => event.data());
};

exports.getEventsByIds = async (eventIds) => {
  const events = await Promise.all(eventIds.map((id) => this.getEventById(id)));
  return events;
};

exports.saveEvent = (event) => {
  return firestore
    .collection("events")
    .doc(event.id)
    .withConverter(EventConverter)
    .set(event, { merge: true });
};
