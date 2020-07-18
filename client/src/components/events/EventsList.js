import React from "react";
import EventCard from "./EventCard";
import { useBookmark } from "../../hooks/bookmark.hook";

const EventsList = ({
  horizontal = false,
  loading = false,
  error = null,
  events,
}) => {
  const { bookmarkEvent, unbookmarkEvent } = useBookmark();

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
            if (!event.bookmarked) bookmarkEvent(event);
            else unbookmarkEvent(event.id);
          }}
        />
      ))}
    </>
  );
};

export default EventsList;
