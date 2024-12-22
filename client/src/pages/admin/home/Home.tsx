import { useState } from "react";
import { City } from "../../../../../server/types";
import CityList from "../../../components/common/home/CityList";
import FilterList from "../../../components/common/home/FilterList";
import SearchInput from "../../../components/common/home/SearchInput";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <div className="max-w-[655px] w-full mx-auto flex flex-col items-center ">
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
    </div>
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
