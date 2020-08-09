import React, { Fragment } from "react";
import EventCard from "./EventCard";

const EventsList = ({
  horizontal = false,
  loading = false,
  error = null,
  events,
  bookmarkEvent = () => {},
  unbookmarkEvent = () => {},
}) => {
  // console.log(events);

  if (loading) return <div>Loading!!</div>;

  if (error) return <div>Error!!</div>;

  return (
    <Fragment>
      {events.map((event) => (
        <EventCard
          key={event.id}
          horizontal={horizontal}
          event={event}
          onBookmark={(event) => {
            if (!event.bookmarked) bookmarkEvent(event.id);
            else unbookmarkEvent(event.id);
          }}
        />
      ))}
    </Fragment>
  );
};

export default EventsList;
