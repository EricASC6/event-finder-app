import React from "react";
import StarRatings from "react-star-ratings";
import venueStyles from "../../styles/venue.module.css";
import moment from "moment";

const VenueReview = ({ review }) => {
  const { stars, text, user, createdAt } = review;
  const { _seconds } = createdAt;
  const { email } = user;

  const date = moment(_seconds * 1000).format("MMM D, y");

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div>
        <h2 className={venueStyles.reviewerEmail}>{email}</h2>
        <p className={venueStyles.reviewerDate}>{date}</p>
      </div>
      <div className={venueStyles.reviewBox}>
        <StarRatings
          rating={stars}
          starDimension="20px"
          starRatedColor="#FBFF24"
        />
        <p style={{ marginTop: "0.75rem", lineHeight: "175%" }}>{text}</p>
      </div>
    </div>
  );
};

export default VenueReview;
