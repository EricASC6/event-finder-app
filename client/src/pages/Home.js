import React, { useState } from "react";
import Page from "../components/layout/Page";
import Container from "../components/general/Container";
import SearchBar from "../components/general/SearchBar";
import { Redirect } from "react-router-dom";
import EventsTopSection from "../components/events/EventsTopSection";
import ExploreEvents from "../components/events/ExploreEvents";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // get rid of whitepspace l to r from search query
  const query = searchQuery.trim();

  if (query.length > 0) return <Redirect to={`/search/${query}`} />;

  return (
    <Page>
      <Container type="events-search-bar">
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
      </Container>
      <EventsTopSection />
      <ExploreEvents />
    </Page>
  );
};

export default Home;
