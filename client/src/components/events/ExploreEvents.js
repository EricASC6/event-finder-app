import React, { useState } from "react";
import { useEventsByCategory } from "../../hooks/events.hook";
import Container from "../general/Container";
import EventsList from "./EventsList";
import Selector from "../general/Selector";
import { EVENT_CATEGORY } from "../../enums/eventsCategory";
import { createSelectorEntries } from "../../utils/utils.selector";

import Title from "../basics/Title";

const ExploreEvents = () => {
  const [category, setCategory] = useState(EVENT_CATEGORY.All);
  const { loading, error, events } = useEventsByCategory(category);

  const categoryEntries = createSelectorEntries(EVENT_CATEGORY);

  return (
    <Container type="events-list">
      <Title>Explore Events</Title>
      <Selector
        active={category}
        entries={categoryEntries}
        onChange={(category) => setCategory(category)}
      />
      <EventsList loading={loading} error={error} events={events} />
    </Container>
  );
};

export default ExploreEvents;