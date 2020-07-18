import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { KEYS } from "../../keys/keys";
import generalStyles from "../../styles/general.module.css";

mapboxgl.accessToken = KEYS.MAP_BOX;

const Map = ({ id, lng, lat }) => {
  const [, setMap] = useState();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: id,
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    setMap(map);
    return () => setMap(null);
  }, [lng, lat, id]);

  return <div className={generalStyles.map} id={id}></div>;
};

export default Map;
