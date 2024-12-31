import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
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

export default function Map({ center, markers = [] }: Props) {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerClassName="w-full h-full"
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} icon={markerIcon} label={{text: `${index + 1}`, color: '#fff'}} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

const markerIcon = (() => {
  const svg = `
    <svg width="30" height="30" viewBox="-15 -15 30 30" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="15" fill="#c730df" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
})();
