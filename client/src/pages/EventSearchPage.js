import React from "react";
import Page from "../components/layout/Page";
import { useEvents } from "../hooks/events.hook";
import { useParams } from "react-router-dom";
import EventsList from "../components/events/EventsList";
import Container from "../components/general/Container";

const EventSearchPage = () => {
  const { query } = useParams();
  const { loading, error, events, bookmarkEvent, unbookmarkEvent } = useEvents({
    keyword: query,
  });

  return (
    <Page>
      <Container type="events-list">
        <EventsList
          loading={loading}
          error={error}
          events={events}
          bookmarkEvent={bookmarkEvent}
          unbookmarkEvent={unbookmarkEvent}
        />
      </Container>
    </Page>
  );
};

export default EventSearchPage;
