import cn from "classnames";
import { Place } from "../../types";
import { categories } from "../../constants";

const filters: Place["category"][] = ["attraction", "cafe", "restaurant"];

export function PlaceFilterList({
  selected,
  onFilter,
}: {
  selected: Place["category"] | null;
  onFilter: (category: Place["category"]) => void;
}) {
  return (
    <ul className="flex gap-x-6">
      {filters.map((filter) => {
        const active = filter === selected;
        return (
          <li key={filter}>
            <button
              className={cn(
                "px-10 border-1 py-7 rounded-3 text-15 tracking-[0.15px]",
                {
                  "text-main border-main": active,
                  "text-gray600  border-gray100": !active,
                }
              )}
              onClick={() => onFilter(filter)}
            >
              {categories[filter]}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
