import React from "react";
import Page from "../components/layout/Page";
import EventsList from "../components/events/EventsList";
import Container from "../components/general/Container";
import Title from "../components/basics/Title";
import { useBookmarkedEvents } from "../hooks/events.hook";

const BookmarkedPage = () => {
  const { array: bookmarks } = useBookmarkedEvents();

  return (
    <Page>
      <Container>
        <Title>Bookmarks</Title>
        <EventsList events={bookmarks} />
      </Container>
    </Page>
  );
};

export default BookmarkedPage;
