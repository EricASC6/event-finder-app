import React from "react";
import venueStyles from "../../styles/venue.module.css";

const VenueCard = ({ venue }) => {
  console.log({ venue });

  const { name, image, location } = venue;
  const { city } = location;

  return (
    <div className={venueStyles.card}>
      {image ? (
        <img src={image} className={venueStyles.image} />
      ) : (
        <div className={venueStyles.blankImage} />
      )}

      <div className={venueStyles.body}>
        <p className={venueStyles.city}>{city}</p>
        <h2 className={venueStyles.name}>{name}</h2>
      </div>
    </div>
  );
};

export default VenueCard;
