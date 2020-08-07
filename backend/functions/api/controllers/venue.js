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

exports.getVenueReviews = (venueId) => {
  return firestore
    .collection("venues")
    .doc(venueId)
    .collection("reviews")
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()));
};

exports.writeVenueReview = async (user, review, venueId) => {
  const { uid, email } = user;
  const { stars, text } = review;

  const venueRef = firestore.collection("venues").doc(venueId);
  const reviewRef = venueRef.collection("reviews").doc();

  await reviewRef.set({
    user: { uid, email },
    stars,
    text,
    createdAt: new Date(),
  });

  const venueSnapshot = await venueRef.withConverter(VenueConverter).get();

  const venue = venueSnapshot.data();

  const { reviews } = venue;
  const { count, average, breakdown } = reviews;

  const newCount = count + 1;
  const newAverage = (count * average + stars) / newCount;
  const newBreakdown = Object.assign({}, breakdown, {
    [stars]: breakdown[stars] + 1,
  });

  return venueRef.set(
    {
      reviews: {
        count: newCount,
        average: newAverage,
        breakdown: newBreakdown,
      },
    },
    { merge: true }
  );
};
