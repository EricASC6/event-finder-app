import React from "react";
import Page from "../components/layout/Page";
import EventsList from "../components/events/EventsList";
import Container from "../components/general/Container";
import Title from "../components/basics/Title";
import { useBookmarkedEvents } from "../hooks/events.hook";
import eventsStyles from "../styles/events.module.css";

const BookmarkedPage = () => {
  // you can only unbookmark an event on the bookmarked list
  const { loading, error, events, unbookmarkEvent } = useBookmarkedEvents();

  return (
    <Page>
      <Container>
        <Title>Bookmarks</Title>
        <div className={eventsStyles.eventsListContainer}>
          <EventsList
            loading={loading}
            error={error}
            events={events}
            bookmarkEvent={unbookmarkEvent}
            unbookmarkEvent={unbookmarkEvent}
          />
        </div>
      </Container>
    </Page>
  );
};

export default BookmarkedPage;
