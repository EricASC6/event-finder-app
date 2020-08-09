import React from "react";
import Page from "../components/layout/Page";
import Container from "../components/general/Container";
import VenueList from "../components/venues/VenueList";
import Title from "../components/basics/Title";
import { useVenues } from "../hooks/venue.hook";
import eventsStyles from "../styles/events.module.css";

const VenuesPage = () => {
  const { loading, error, venues } = useVenues();

  return (
    <Page>
      <Container>
        <Title>Venues</Title>

        <div className={eventsStyles.eventsListContainer}>
          <VenueList loading={loading} error={error} venues={venues} />
        </div>
      </Container>
    </Page>
  );
};

export default VenuesPage;
