import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as BoomarkIcon } from "../../icons/bookmark.svg";
import { ReactComponent as BoomarkFilledIcon } from "../../icons/bookmark-filled.svg";
import Category from "../general/Category";
import eventsStyles from "../../styles/events.module.css";

const EventCard = ({ horizontal = false, event, onBookmark = () => {} }) => {
  // console.log(event);

  const {
    id,
    name,
    image,
    date,
    duration,
    category,
    location,
    bookmarked,
  } = event;

  const { month, day } = date;
  const { startTime } = duration;
  const { city } = location;

  const eventCardClassName =
    eventsStyles.card +
    " " +
    (horizontal ? eventsStyles.cardHorizontal : eventsStyles.cardVertical);
  const eventName = name.length >= 15 ? name.substring(0, 15) + "..." : name;
  const eventDate = `${month} ${day}`;
  const eventDetailsPath = `/event/${id}`;

  return (
    <div className={eventCardClassName} id={id}>
      <Link className={eventsStyles.cardLink} to={eventDetailsPath}>
        <img className={eventsStyles.image} src={image} alt="event" />
      </Link>
      <div className={eventsStyles.body}>
        <div className={eventsStyles.cardHead}>
          <div>
            <h4 className={eventsStyles.city}>{city}</h4>
            <Link className={eventsStyles.cardLink} to={eventDetailsPath}>
              <h2 className={eventsStyles.name}>{eventName}</h2>
            </Link>
          </div>
          {bookmarked ? (
            <BoomarkFilledIcon onClick={() => onBookmark(event)} />
          ) : (
            <BoomarkIcon onClick={() => onBookmark(event)} />
          )}
        </div>
        <div className={eventsStyles.cardBottom}>
          <div className={eventsStyles.bottomLeft}>
            <Category name={category} />
            <p className={eventsStyles.startTime}>{startTime}</p>
          </div>
          <p className={eventsStyles.eventDate}>{eventDate}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
