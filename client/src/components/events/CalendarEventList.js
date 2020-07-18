import React from "react";
import CalendarEventCard from "./CalendarEventCard";

const CalendarEventList = ({ loading = false, error = null, events }) => {
  if (loading) return <div>Loading!!</div>;

  if (error) return <div>Error!!</div>;

  return (
    <>
      {events.map((event) => (
        <CalendarEventCard key={event.id} event={event} />
      ))}
    </>
  );
};

export default CalendarEventList;
