import React from "react";
import Page from "../components/layout/Page";
import { useEvents } from "../hooks/events.hook";
import { useParams } from "react-router-dom";
import EventsList from "../components/events/EventsList";
import Container from "../components/general/Container";
import eventsStyles from "../styles/events.module.css";
import Title from "../components/basics/Title";

const EventSearchPage = () => {
  const { query } = useParams();
  const { loading, error, events, bookmarkEvent, unbookmarkEvent } = useEvents({
    keyword: query,
  });

  return (
    <Page>
      <Container type="events-list">
        <Title>Search for {query}</Title>
        <div className={eventsStyles.eventsListContainer}>
          <EventsList
            loading={loading}
            error={error}
            events={events}
            bookmarkEvent={bookmarkEvent}
            unbookmarkEvent={unbookmarkEvent}
          />
        </div>
      </Container>
    </Page>
  );
};

export default EventSearchPage;
