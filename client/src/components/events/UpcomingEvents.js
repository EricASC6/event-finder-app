import React from "react";
import { useUpcomingEvents } from "../../hooks/events.hook";
import EventsList from "./EventsList";

const UpcomingEvents = () => {
  const { loading, error, events } = useUpcomingEvents();

  if (loading) return <div>Loading!!</div>;

  if (error) return <div>Error!!</div>;

  return (
    <EventsList horizontal loading={loading} error={error} events={events} />
  );
};

export default UpcomingEvents;
