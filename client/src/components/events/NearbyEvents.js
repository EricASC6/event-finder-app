import React from "react";
import EventsList from "./EventsList";
import { useEventsByLocation } from "../../hooks/events.hook";

const NearbyEvents = ({ coordinates }) => {
  const { longitude, latitude } = coordinates;

  const {
    loading,
    error,
    events,
    bookmarkEvent,
    unbookmarkEvent,
  } = useEventsByLocation(longitude, latitude);

  return (
    <EventsList
      horizontal
      loading={loading}
      error={error}
      events={events}
      bookmarkEvent={bookmarkEvent}
      unbookmarkEvent={unbookmarkEvent}
    />
  );
};

export default NearbyEvents;
