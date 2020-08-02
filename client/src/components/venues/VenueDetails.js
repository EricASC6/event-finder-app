import React, { Fragment } from "react";
import venueStyles from "../../styles/venue.module.css";
import Container from "../general/Container";
import { useEventsByVenueId } from "../../hooks/events.hook";
import Title from "../basics/Title";
import EventsList from "../events/EventsList";

const VenueDetails = ({ venue }) => {
  const { id, name, image, location, description, upcomingEvents } = venue;
  const { city } = location;

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
      <Container>
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
      </Container>
    </Fragment>
  );
};

export default VenueDetails;
