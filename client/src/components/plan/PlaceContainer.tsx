import { useState } from "react";
import { Place } from "../../types";
import SearchInput from "../common/SearchInput";
import { PlaceFilterList } from "./PlaceFilterList";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPlaces } from "../../services/plan";
import Loading from "../common/Loading";
import PlaceList from "./PlaceList";

export default function PlaceContainer() {
  const { city } = useParams();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Place["category"] | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: ["places", city, q, filter],
    enabled: !!city,
    queryFn: () => {
      const query = {
        ...(q ? { q } : {}),
        ...(filter ? { category: filter } : {}),
      };
      return getPlaces(city!, query);
    },
  });

  const handleFilter = (category: Place["category"]) => {
    if (filter === category) {
      setFilter(null);
    } else {
      setFilter(category);
    }
  };
  return (
    <div className="flex flex-col h-full gap-y-18">
      <SearchInput onSearch={(query) => setQ(query)} />
      <PlaceFilterList selected={filter} onFilter={handleFilter} />
      <div className="flex-1 overflow-y-hidden">
        {isLoading || !data ? <Loading /> : <PlaceList places={data} />}
      </div>
    </div>
  );
}
