import cn from "classnames";
import { Place } from "../../types";
import { categories } from "../../constants";

interface Props {
  className?: string;
  category: Place["category"];
}

export default function PlaceCategory({ category, className }: Props) {
  return (
    <span className={cn("font-medium text-main", className)}>
      {categories[category]}
    </span>
  );
}
