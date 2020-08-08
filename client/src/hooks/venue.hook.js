import { useState, useEffect } from "react";
import { useAsync } from "./async.hook";
import { VenueService } from "../services/venue";

export const useVenues = () => {
  const [venues, setVenues] = useState([]);
  const { loading, error, execute: getVenues } = useAsync({
    fn: () => VenueService.getVenues(),
    initLoading: true,
    immediate: false,
    onResolve: (v) => setVenues(v),
  });

  useEffect(() => {
    getVenues();
  }, []);

  return { loading, error, venues };
};

export const useVenue = (venueId) => {
  const [venue, setVenue] = useState({});
  const { loading, error, execute: getVenue } = useAsync({
    fn: (venueId) => VenueService.getVenue(venueId),
    initLoading: true,
    immediate: false,
    onResolve: (v) => setVenue(v),
  });

  useEffect(() => {
    const initVenue = () => getVenue(venueId);

    initVenue();
  }, []);

  const updateReviewBreakdown = (review) => {
    const { stars } = review;

    setVenue((v) => {
      const venue = Object.assign({}, v);

      const { reviews } = venue;

      reviews.count++;
      reviews.average =
        (reviews.average * (reviews.count - 1) + stars) / reviews.count;
      reviews.breakdown[stars]++;
      return venue;
    });
  };

  return { loading, error, venue, updateReviewBreakdown };
};

export const useVenueReviews = (venueId) => {
  const [reviews, setReviews] = useState([]);
  const { loading, error, execute: getReviews } = useAsync({
    fn: (venueId) => VenueService.getVenueReviews(venueId),
    initLoading: true,
    immediate: false,
    onResolve: (reviews) => setReviews(reviews),
  });

  useEffect(() => {
    const initReviews = () => getReviews(venueId);

    initReviews();
  }, []);

  const writeReview = ({ stars, text }) => {
    return VenueService.writeVenueReview(venueId, {
      text,
      stars,
    }).then((review) => {
      setReviews((r) => [review, ...r]);
      return review;
    });
  };

  return { loading, error, reviews, writeReview };
};
