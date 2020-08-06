import React from "react";
import StarRatings from "react-star-ratings";
import venueStyles from "../../styles/venue.module.css";

const VenueReview = () => {
  return (
    <div>
      <div>
        <h2 className={venueStyles.reviewerEmail}>eric@gmail.com</h2>
        <p className={venueStyles.reviewerDate}>Created Jun 13, 2020</p>
      </div>
      <div className={venueStyles.reviewBox}>
        <StarRatings rating={3} starDimension="20px" starRatedColor="#FBFF24" />
        <p style={{ marginTop: "0.75rem", lineHeight: "175%" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
          atque fugit ipsam accusamus ratione voluptates in unde. Assumenda,
          pariatur sit fuga blanditiis laborum voluptatem quod error explicabo
          facilis non magni.
        </p>
      </div>
    </div>
  );
};

export default VenueReview;
