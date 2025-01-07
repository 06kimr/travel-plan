import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import { PropsWithChildren } from "react";
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface Props {
  center: {
    lat: number;
    lng: number;
  };
  markers?: {
    lat: number;
    lng: number;
  }[];
}

export default function Map({ center, children }: PropsWithChildren<Props>) {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerClassName="w-full h-full"
      >
        {children}
      </GoogleMap>
    </LoadScript>
  );
}

export function MapMarker({
  coordinates,
  options: { color = "#C730DF" } = {},
  label,
}: {
  coordinates: {
    lat: number;
    lng: number;
  };
  label?: string;
  options?: {
    color?: `#${string}`;
  };
}) {
  const markerIcon = generateMarkerIcon(color);
  return (
    <MarkerF
      position={coordinates}
      icon={markerIcon}
      label={label ? { text: label, color: "#fff" } : undefined}
    />
  );
}

export function MapPath({
  path,
  options: { color = "#C730DF" } = {},
}: {
  path: { lat: number; lng: number }[];
  options?: { color?: `#${string}` };
}) {
  return <PolylineF path={path} options={{ strokeColor: color }} />;
}

const generateMarkerIcon = (color: `#${string}`) => {
  const svg = `
    <svg width="30" height="30" viewBox="-15 -15 30 30" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="15" fill="${color}" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
