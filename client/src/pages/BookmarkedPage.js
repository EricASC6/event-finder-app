import React from "react";
import Page from "../components/layout/Page";
import EventsList from "../components/events/EventsList";
import Container from "../components/general/Container";
import Title from "../components/basics/Title";
import { useBookmarkedEvents } from "../hooks/events.hook";

const BookmarkedPage = () => {
  // you can only unbookmark an event on the bookmarked list
  const { loading, error, events, unbookmarkEvent } = useBookmarkedEvents();

  return (
    <Page>
      <Container>
        <Title>Bookmarks</Title>
        <EventsList
          loading={loading}
          error={error}
          events={events}
          bookmarkEvent={unbookmarkEvent}
          unbookmarkEvent={unbookmarkEvent}
        />
      </Container>
    </Page>
  );
};

export default BookmarkedPage;
