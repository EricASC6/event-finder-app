import React, { Fragment } from "react";
import venueStyles from "../../styles/venue.module.css";
import Container from "../general/Container";
import { useEventsByVenueId } from "../../hooks/events.hook";
import Title from "../basics/Title";
import EventsList from "../events/EventsList";
import { useToggle } from "../../hooks/toggle.hook";
import { useVenueReviews } from "../../hooks/venue.hook";
import VenueReviewModal from "./VenueReviewModal";
import StarRatings from "react-star-ratings";
import VenueReviewsList from "./VenueReviewsList";
import ReviewsBreakdown from "./ReviewsBreakdown";
import eventsStyles from "../../styles/events.module.css";

const VenueDetails = ({ venue, updateReviewBreakdown }) => {
  const {
    id,
    name,
    image,
    location,
    description,
    upcomingEvents,
    reviews,
  } = venue;
  const { city } = location;
  const { average, count, breakdown } = reviews;

  const reviewBreakdown = Object.values(breakdown);

  reviewBreakdown.reverse();

  const {
    loading: reviewsLoading,
    error: reviewsError,
    reviews: reviewsList,
    writeReview,
  } = useVenueReviews(id);
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

        <div className={venueStyles.mainDetailsContainer}>
          <div style={{ paddingTop: "0.5rem", flex: 1, marginRight: "1.5rem" }}>
            <p className={venueStyles.upcomingEvents}>
              {upcomingEvents} Upcoming Events
            </p>
            <Title>Upcoming Events</Title>
            {/* <div className={eventsStyles.eventsListContainer}> */}
            <EventsList
              loading={eventsLoading}
              error={eventsError}
              events={events}
              bookmarkEvent={bookmarkEvent}
              unbookmarkEvent={unbookmarkEvent}
            />
            {/* </div> */}
          </div>
          <div style={{ marginTop: "2rem", flex: 1 }}>
            <Title>Reviews</Title>
            <h2 className={venueStyles.ratings}>
              {Math.floor(average * 100) / 100}
            </h2>
            <StarRatings
              rating={average}
              starDimension="28px"
              starRatedColor="#FBFF24"
            />
            <p className={venueStyles.ratingsLabel}>based on {count} ratings</p>
            <div style={{ marginTop: "1rem" }}>
              <ReviewsBreakdown total={count} breakdown={reviewBreakdown} />
            </div>
            <div style={{ marginTop: "2rem" }}>
              <VenueReviewsList
                loading={reviewsLoading}
                error={reviewsError}
                reviews={reviewsList}
              />
            </div>
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
        className={venueStyles.reviewModal}
        onWrite={({ stars, text }) => {
          writeReview({ stars, text }).then((review) =>
            updateReviewBreakdown(review)
          );
          closeReviewModal();
        }}
      />
    </Fragment>
  );
};

export default VenueDetails;
