import React from "react";
import Page from "../components/layout/Page";
import { useParams } from "react-router-dom";
import { useVenue } from "../hooks/venue.hook";
import VenueDetails from "../components/venues/VenueDetails";

const VenueDetailsPage = () => {
  const { id } = useParams();
  const { loading, error, venue } = useVenue(id);

  if (loading) return <div>Loading!!</div>;

  if (error) return <div>Error!!</div>;

  return (
    <Page>
      <VenueDetails venue={venue} />
    </Page>
  );
};

export default VenueDetailsPage;
