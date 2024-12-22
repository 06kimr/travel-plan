import { useState } from "react";
import { City } from "../../../../../server/types";
import NarrowLayout from "../../../components/common/NarrowLayout";
import CityList from "../../../components/home/CityList";
import FilterList from "../../../components/home/FilterList";
import SearchInput from "../../../components/home/SearchInput";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <NarrowLayout className=" flex flex-col items-center my-30">
      <div className="w-[339px] mb-24">
        <SearchInput
          onChange={setSearch}
          value={search}
          onCompositionEnd={(value) => console.log(value)}
        />
      </div>
      <div className="mb-21">
        <FilterList active="all" onChange={() => {}} />
      </div>
      <CityList cities={DUMMY_DATA} />
    </NarrowLayout>
  );
}

const DUMMY_DATA: City[] = [
  {
    city: "a",
    name: "a",
    description: "aaaa",
    thumbnail: "https://picsum.photos/300/200?random=1",
  },
  {
    city: "b",
    name: "b",
    description: "bbbbb",
    thumbnail: "https://picsum.photos/300/200?random=2",
  },
  {
    city: "c",
    name: "c",
    description: "ccccc",
    thumbnail: "https://picsum.photos/300/200?random=3",
  },
  {
    city: "d",
    name: "d",
    description: "ddddd",
    thumbnail: "https://picsum.photos/300/200?random=4",
  },
];
