import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaces } from "../../services/plan";
import { usePlanStore } from "../../store";
import { Place } from "../../types";
import Loading from "../common/Loading";
import SearchInput from "../common/SearchInput";
import PlaceList from "./PlaceList";

export default function AccommodationContainer() {
  const { city } = useParams();
  const [q, setQ] = useState("");

  // const { addPlannedPlace } = usePlanStore();

  const { isLoading, data } = useQuery({
    queryKey: ["places", city, q],
    enabled: !!city,
    queryFn: () => {
      const query = {
        ...(q ? { q } : {}),
        ...{ category: "accommodation" },
      };
      return getPlaces(city!, query);
    },
  });

  return (
    <div className="flex flex-col h-full gap-y-18">
      <SearchInput onSearch={(query) => setQ(query)} />
      <div className="flex-1 overflow-y-hidden">
        {isLoading || !data ? (
          <Loading />
        ) : (
          <PlaceList
            places={data}
            onAddPlace={(place: Place) => console.log("place", place)}
          />
        )}
      </div>
    </div>
  );
}
