import React from "react";
import EventInfo from "../../models/EventInfo";
import Container from "../general/Container";
import Category from "../general/Category";
import Map from "../general/Map";
import BackButton from "../general/BackButton";
import { ReactComponent as BoomarkIcon } from "../../icons/bookmark.svg";
import { ReactComponent as CalendarPlusIcon } from "../../icons/calendar-plus.svg";
import { ReactComponent as TicketIcon } from "../../icons/ticket.svg";
import propTypes from "prop-types";
import eventsStyles from "../../styles/events.module.css";

const EventDetails = ({ event }) => {
  const {
    name,
    image,
    date,
    duration,
    description,
    category,
    location,
    priceRanges,
    url,
  } = event;

  const { month, day, week } = date;
  const { startTime, endTime } = duration;
  const { address, city, coordinates } = location;
  const { minPrice, maxPrice } = priceRanges;

  const eventMonth = month.toUpperCase();
  const durationInterval = `${startTime} - ${endTime}`;
  const { longitude: lng, latitude: lat } = coordinates;

  const price =
    minPrice === maxPrice && maxPrice !== 0
      ? `$${minPrice}`
      : minPrice === maxPrice && maxPrice === 0
      ? "Free"
      : `$${minPrice} - $${maxPrice}`;

  return (
    <React.Fragment>
      <BackButton className={eventsStyles.backBtn} to="/" />
      <img className={eventsStyles.detailsImage} src={image} alt="event" />
      <Container className={eventsStyles.detailsContainer} type="event-details">
        <div className={eventsStyles.detailsHead}>
          <div>
            <h4 className={eventsStyles.city}>{city}</h4>
            <h2 className={eventsStyles.detailsName}>{name}</h2>
          </div>
          <BoomarkIcon className={eventsStyles.bookmark} />
        </div>
        <div className={eventsStyles.detailsBanner}>
          <div className={eventsStyles.detailsTime}>
            <div className={eventsStyles.dateBox}>
              <p className={eventsStyles.detailsMonth}>{eventMonth}</p>
              <p className={eventsStyles.detailsDay}>{day}</p>
            </div>
            <div>
              <p className={eventsStyles.detailsWeek}>{week}</p>
              <p className={eventsStyles.detailsDuration}>{durationInterval}</p>
            </div>
          </div>
          <button className={eventsStyles.calendarBtn}>
            Add To Calendar{" "}
            <CalendarPlusIcon className={eventsStyles.calendarIcon} />
          </button>
        </div>
        <div className={eventsStyles.detailsSection}>
          <h2 className={eventsStyles.detailsHeader}>Info</h2>
          <p className={eventsStyles.detailsContent}>{description}</p>
        </div>
        <div className={eventsStyles.detailsSection}>
          <h2 className={eventsStyles.detailsHeader}>Tag</h2>
          <Category name={category} medium />
        </div>
        <div className={eventsStyles.detailsSection}>
          <h2 className={eventsStyles.detailsHeader}>Directions</h2>
          <p className={eventsStyles.detailsContent}>{address}</p>
          <Map id="123" lng={lng} lat={lat} />
        </div>
      </Container>
      <Container className={eventsStyles.priceContainer}>
        <div className={eventsStyles.priceBanner}>
          <div>
            <h3 className={eventsStyles.priceHead}>Price</h3>
            <p className={eventsStyles.priceRange}>{price}</p>
          </div>
          <a className={eventsStyles.attendBtn} href={url} target="__blank">
            <TicketIcon className={eventsStyles.ticketIcon} />
            Attend
          </a>
        </div>
      </Container>
    </React.Fragment>
  );
};

EventDetails.propTypes = {
  event: propTypes.instanceOf(EventInfo),
};

export default EventDetails;