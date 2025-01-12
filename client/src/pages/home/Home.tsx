import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../../components/common/Loading";
import NarrowLayout from "../../components/common/NarrowLayout";
import CityList from "../../components/home/CityList";
import FilterList from "../../components/home/FilterList";
import SearchInput from "../../components/common/SearchInput";
import { getCities, getSearchedCities } from "../../services/home";

export default function Home() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<'all' | 'domestic' | 'international'>('all');
  const { isLoading, data } = useQuery({
    queryKey: ["cities", q, filter],
    queryFn: q ? () => getSearchedCities(q) : () => getCities(filter === 'all' ? undefined : filter),
  });

  return isLoading || !data ? (
    <Loading />
  ) : (
    <NarrowLayout className="flex flex-col items-center my-30">
      <div className="w-[339px] mb-24">
        <SearchInput onSearch={(value) => setQ(value)} />
      </div>
      <div className="mb-21">
        <FilterList active={filter} onChange={(e) => setFilter(e)} />
      </div>
      <CityList cities={data} />
    </NarrowLayout>
  );
}
