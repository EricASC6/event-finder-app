import React from "react";
import eventsStyles from "../../styles/events.module.css";
import { Link } from "react-router-dom";

const CalendarEventCard = ({ event }) => {
  const { id, name, date, duration } = event;

  const NAME_LENGTH = 25;
  const eventName =
    name.length >= NAME_LENGTH ? name.substring(0, NAME_LENGTH) + "..." : name;

  const { month, day } = date;
  const eventMonth = month.toUpperCase();

  const { startTime, endTime } = duration;
  const durationInterval = `${startTime} - ${endTime}`;

  const link = `/event/${id}`;

  console.log(event);

  return (
    <div className={eventsStyles.calendarCard}>
      <div className={eventsStyles.dateBox}>
        <p className={eventsStyles.detailsMonth}>{eventMonth}</p>
        <p className={eventsStyles.detailsDay}>{day}</p>
      </div>

      <div>
        <Link to={link}>
          <h2 className={eventsStyles.name}>{eventName}</h2>
          <p className={eventsStyles.detailsDuration}>{durationInterval}</p>
        </Link>
      </div>
    </div>
  );
};

export default CalendarEventCard;
