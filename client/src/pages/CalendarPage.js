import React from "react";
import Page from "../components/layout/Page";
import Container from "../components/general/Container";
import Title from "../components/basics/Title";
import CalendarEventList from "../components/events/CalendarEventList";
import { useEventsOnCalendar } from "../hooks/events.hook";

const CalendarPage = () => {
  const { loading, error, events } = useEventsOnCalendar();

  return (
    <Page>
      <Container>
        <Title>Calendar</Title>
        <CalendarEventList loading={loading} error={error} events={events} />
      </Container>
    </Page>
  );
};

export default CalendarPage;
