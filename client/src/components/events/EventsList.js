import React from "react";
import EventCard from "./EventCard";

const EventsList = ({
  horizontal = false,
  loading = false,
  error = null,
  events,
}) => {
  // console.log(events);

  if (loading) return <div>Loading!!</div>;

  if (error) return <div>Error!!</div>;

  return (
    <>
      {events.map((event) => (
        <EventCard
          key={event.id}
          horizontal={horizontal}
          event={event}
          onBookmark={(event) => {
            console.log(event);
          }}
        />
      ))}
    </>
  );
};

export default EventsList;
