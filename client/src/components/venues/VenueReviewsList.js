import React, { Fragment } from "react";
import VenueReview from "./VenueReview";

const VenueReviewsList = ({ loading, error, reviews }) => {
  if (loading) return <div>loading!!!</div>;

  if (error) return <div>error!!!</div>;

  return (
    <Fragment>
      {reviews.map((review) => (
        <VenueReview review={review} key={review.id} />
      ))}
    </Fragment>
  );
};

export default VenueReviewsList;
