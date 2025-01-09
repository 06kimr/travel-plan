import { PlanState } from "../../../store";
import { Place } from "../../../types";
import Map, { MapMarker, MapPath } from "../../plan/Map";

interface Props {
  plannedPlaces: PlanState["plannedPlaces"];
  accommodation: Place | null;
}

export default function ItineraryMapContainer({
  plannedPlaces,
  accommodation,
}: Props) {
  const markers = plannedPlaces.map(
    (plannedPlace) => plannedPlace.place.coordinates
  );
  return (
    <Map center={plannedPlaces[0].place.coordinates}>
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          coordinates={marker}
          options={{ color: "#0095A9" }}
          label={`${index + 1}`}
        />
      ))}

      {accommodation && (
        <MapMarker
          coordinates={accommodation.coordinates}
          options={{ color: "#C739Df" }}
          label="숙소"
        />
      )}
    <MapPath
        path={[
          ...markers,
          ...(accommodation ? [accommodation.coordinates] : []),
        ]}
        options={{ color: "#0095a9" }}
      />
    </Map>
  );
}
