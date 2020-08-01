import React from "react";
import Page from "../components/layout/Page";
import Container from "../components/general/Container";
import VenueList from "../components/venues/VenueList";
import Title from "../components/basics/Title";
import { useVenues } from "../hooks/venue.hook";

const VenuesPage = () => {
  const { loading, error, venues } = useVenues();

  return (
    <Page>
      <Container>
        <Title>Venues</Title>
      </Container>
      <Container>
        <VenueList loading={loading} error={error} venues={venues} />
      </Container>
    </Page>
  );
};

export default VenuesPage;
