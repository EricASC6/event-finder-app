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
