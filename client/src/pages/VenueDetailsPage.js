import React from "react";
import Page from "../components/layout/Page";
import { useParams } from "react-router-dom";

const VenueDetailsPage = () => {
  const { id } = useParams();

  return <Page>This is the venue details page {id}</Page>;
};

export default VenueDetailsPage;
