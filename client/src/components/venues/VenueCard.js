import React from "react";
import venueStyles from "../../styles/venue.module.css";
import { Link } from "react-router-dom";

const VenueCard = ({ venue }) => {
  console.log({ venue });

  const { id, name, image, location, upcomingEvents } = venue;
  const { city } = location;

  const venueDetailsLink = `/venues/${id}`;

  return (
    <div className={venueStyles.card}>
      {image ? (
        <img src={image} className={venueStyles.image} />
      ) : (
        <div className={venueStyles.blankImage} />
      )}

      <div className={venueStyles.body}>
        <p className={venueStyles.city}>{city}</p>
        <Link to={venueDetailsLink}>
          <h2 className={venueStyles.name}>{name}</h2>
        </Link>
        <p className={venueStyles.upcomingEvents}>
          {upcomingEvents} Upcoming Events
        </p>
      </div>
    </div>
  );
};

export default VenueCard;
