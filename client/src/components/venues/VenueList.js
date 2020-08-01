import React, { Fragment } from "react";

const VenueList = ({ loading, error, venues }) => {
  if (loading) return <div>Loading!!</div>;

  if (error) return <div>Error!!</div>;

  return (
    <Fragment>
      {venues.map((venue) => {
        return <div>{venue.name}</div>;
      })}
    </Fragment>
  );
};

export default VenueList;
