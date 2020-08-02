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

  return { loading, error, venue };
};
