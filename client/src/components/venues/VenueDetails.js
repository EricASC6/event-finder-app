import React, { Fragment } from "react";
import venueStyles from "../../styles/venue.module.css";
import Container from "../general/Container";
import { useEventsByVenueId } from "../../hooks/events.hook";
import Title from "../basics/Title";
import EventsList from "../events/EventsList";
import { useToggle } from "../../hooks/toggle.hook";
import VenueReviewModal from "./VenueReviewModal";
import StarRatings from "react-star-ratings";
import VenueReviewsList from "./VenueReviewsList";

const VenueDetails = ({ venue }) => {
  const { id, name, image, location, description, upcomingEvents } = venue;
  const { city } = location;

  const [reviewModalOpen, openReviewModal, closeReviewModal] = useToggle(false);

  const {
    loading: eventsLoading,
    error: eventsError,
    events,
    bookmarkEvent,
    unbookmarkEvent,
  } = useEventsByVenueId(id);

  return (
    <Fragment>
      {image && <img src={image} className={venueStyles.detailsImage} />}
      <Container className={venueStyles.detailsContainer}>
        <div style={{ padding: "0.5rem 0" }}>
          <p className={venueStyles.city}>{city}</p>
          <h2 className={venueStyles.detailsName}>{name}</h2>
          <p className={venueStyles.detailsContent}>{description}</p>
        </div>
        <div style={{ paddingTop: "0.5rem" }}>
          <p className={venueStyles.upcomingEvents}>
            {upcomingEvents} Upcoming Events
          </p>
          <Title>Upcoming Events</Title>
          <EventsList
            loading={eventsLoading}
            error={eventsError}
            events={events}
            bookmarkEvent={bookmarkEvent}
            unbookmarkEvent={unbookmarkEvent}
          />
        </div>
        <div>
          <Title>Reviews</Title>
          <h2 className={venueStyles.ratings}>4.44</h2>
          <StarRatings
            rating={3}
            starDimension="28px"
            starRatedColor="#FBFF24"
          />
          <p className={venueStyles.ratingsLabel}>based on 23 ratings</p>
          <div style={{ marginTop: "1rem" }}>
            <VenueReviewsList />
          </div>
        </div>
      </Container>
      <Container className={venueStyles.bottomContainer}>
        <h2 className={venueStyles.question}>Liked this venued?</h2>
        <button className={venueStyles.btn} onClick={openReviewModal}>
          Write a Review
        </button>
      </Container>
      <VenueReviewModal
        open={reviewModalOpen}
        handleClose={closeReviewModal}
        width="250px"
      />
    </Fragment>
  );
};

export default VenueDetails;
