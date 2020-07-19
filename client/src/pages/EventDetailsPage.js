import React from "react";
import Page from "../components/layout/Page";
import EventDetails from "../components/events/EventDetails";
import { useParams } from "react-router-dom";
import { useEvent } from "../hooks/events.hook";
import eventStyles from "../styles/events.module.css";

const EventDetailsPage = () => {
  const { id } = useParams();
  const { loading, error, event } = useEvent(id);

  if (loading)
    return (
      <Page>
        <div>Loading</div>;
      </Page>
    );

  if (error)
    return (
      <Page>
        <div>Error!</div>
      </Page>
    );

  return (
    <Page>
      <div className={eventStyles.detailsPage} id={event.id}>
        <EventDetails event={event} />
      </div>
    </Page>
  );
};

export default EventDetailsPage;
