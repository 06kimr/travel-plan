import { useState } from "react";
import SearchIcon from "../../assets/icons/search.svg?react";

interface Props {
  onCompositionEnd: (value: string) => void;
}

export default function SearchInput({ onCompositionEnd }: Props) {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full relative">
      <input
        type="text"
        className="w-full rounded-10 h-40 border border-gray200 pl-10 pr-46"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        onCompositionEnd={(e) => onCompositionEnd(e.currentTarget.value)}
      />
      <SearchIcon className="absolute top-9 right-12" />
    </div>
  );
}
