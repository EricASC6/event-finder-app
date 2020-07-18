import { useState, useEffect } from "react";

export const useLocation = () => {
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success
        setCoordinates(position.coords);
        setAccepted(true);
        setLoading(false);
      },
      () => {
        // Failure
        setAccepted(false);
        setLoading(false);
      }
    );
  }, []);

  return { loading, accepted, coordinates };
};
