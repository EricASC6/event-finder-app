import React from "react";
import Page from "../components/layout/Page";
import EventDetails from "../components/events/EventDetails";
import { useParams } from "react-router-dom";
import { useEvent } from "../hooks/events.hook";
import EventInfo from "../models/EventInfo";
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

  console.log(event);

  const eventInfo = EventInfo.transformTMApiDataIntoEventInfo(event);

  console.log(eventInfo);

  return (
    <Page>
      <div className={eventStyles.detailsPage} id={eventInfo.id}>
        <EventDetails event={eventInfo} />
      </div>
    </Page>
  );
};

export default EventDetailsPage;
