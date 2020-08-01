import React, { Fragment } from "react";
import VenueCard from "./VenueCard";

const VenueList = ({ loading, error, venues }) => {
  if (loading) return <div>Loading!!</div>;

  if (error) return <div>Error!!</div>;

  return (
    <Fragment>
      {venues.map((venue) => {
        return <VenueCard key={venue.id} venue={venue} />;
      })}
    </Fragment>
  );
};

export default VenueList;
