import React from "react";
import Page from "../components/layout/Page";
import Container from "../components/general/Container";
import Title from "../components/basics/Title";
import CalendarEventList from "../components/events/CalendarEventList";
import { useEventsOnCalendar } from "../hooks/events.hook";
import eventsStyles from "../styles/events.module.css";

const CalendarPage = () => {
  const { loading, error, events } = useEventsOnCalendar();

  return (
    <Page>
      <Container>
        <Title>Calendar</Title>
        <div className={eventsStyles.eventsListContainer}>
          <CalendarEventList loading={loading} error={error} events={events} />
        </div>
      </Container>
    </Page>
  );
};

export default CalendarPage;
