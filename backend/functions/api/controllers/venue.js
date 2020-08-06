const admin = require("../admin/admin");
const Venue = require("../models/venue");

const firestore = admin.firestore();

const VenueConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Venue(data);
  },
  toFirestore: (venue) => {
    const { ...rest } = venue;
    return rest;
  },
};

exports.getVenueById = (venueId) => {
  return firestore
    .collection("venues")
    .doc(venueId)
    .withConverter(VenueConverter)
    .get();
};

exports.saveVenue = (venue) => {
  return firestore
    .collection("venues")
    .doc(venue.id)
    .withConverter(VenueConverter)
    .set(venue);
};
