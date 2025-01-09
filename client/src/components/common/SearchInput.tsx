import { ChangeEvent, useState } from "react";
import SearchIcon from "../../assets/icons/search.svg?react";
import useThrottle from "../../hooks/common/useThrottle";

interface Props {
  onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  const throttle = useThrottle();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
    throttle(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full h-40 pl-10 border rounded-10 border-gray200 pr-46"
        value={search}
        onChange={handleSearch}
      />
      <SearchIcon className="absolute top-9 right-12" />
    </div>
  );
}
