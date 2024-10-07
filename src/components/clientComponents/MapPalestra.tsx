"use client";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapMouseEvent,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback } from "react";

type Poi = { key: string; location: google.maps.LatLngLiteral };
const location: Poi = {
  key: "athenaPalestra",
  location: { lat: 40.549448, lng: 16.657666 },
};

const Marker = (props: { poi: Poi }) => {
  const map = useMap();
  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!ev.latLng) return;
      map.panTo(ev.latLng);
      map.setZoom(18);
    },
    [map]
  );
  return (
    <AdvancedMarker
      key={props.poi.key}
      position={props.poi.location}
      clickable={true}
      onClick={handleClick}
    >
      <Pin />
    </AdvancedMarker>
  );
};

const MapPalestra = () => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}>
      <Map
        defaultZoom={14}
        defaultCenter={{ lat: 40.549448, lng: 16.657666 }}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID_MAP}
      >
        <Marker poi={location} />
      </Map>
    </APIProvider>
  );
};

export default MapPalestra;
