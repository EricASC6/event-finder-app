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
  }
}

exports.tranformTicketMasterEvent = (event) => {
  console.log({ event });

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

exports.getEvents = (options = {}) => {
  const query = queryParams.createQueryString({
    ...options,
    ...DEFAULT_QUERY_PARAMS,
  });
  return query;
};
