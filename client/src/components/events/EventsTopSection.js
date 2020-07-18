import React from "react";
import ScrollView from "../general/ScrollView";
import { useLocation } from "../../hooks/location.hook";
import { useBookmark } from "../../hooks/bookmark.hook";
import UpcomingEvents from "./UpcomingEvents";
import Loading from "../general/Loading";
import NearbyEvents from "./NearbyEvents";

const EventsTopSection = () => {
  const { loading, accepted, coordinates } = useLocation();

  if (loading) return <Loading />;

  return (
    <div>
      <ScrollView>
        {accepted ? (
          <NearbyEvents coordinates={coordinates} />
        ) : (
          <UpcomingEvents />
        )}
      </ScrollView>
    </div>
  );
};

export default EventsTopSection;
