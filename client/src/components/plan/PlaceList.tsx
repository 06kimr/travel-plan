import HeartIcon from "../../assets/icons/favorite.svg?react";
import StarIcon from "../../assets/icons/grade.svg?react";
import PlusIcon from "../../assets/icons/plus.svg?react";
import PlusRectIcon from "../../assets/icons/plus_rect.svg?react";
import { Place } from "../../types";
import PlaceCategory from "../common/PlaceCategory";

interface Props {
  places: Place[];
  onAddPlace: (place: Place) => void;
}

export default function PlaceList({ places, onAddPlace }: Props) {
  return (
    <div className="flex flex-col h-full mb-24 overflow-y-scroll">
      {places.map((place) => (
        <PlaceItem
          key={`${place.city}_${place.name}`}
          place={place}
          onAddPlace={onAddPlace}
        />
      ))}
    </div>
  );
}

function PlaceItem({
  place,
  onAddPlace,
}: {
  place: Place;
  onAddPlace: (place: Place) => void;
}) {
  return (
    <div className="flex mb-24 gap-x-11">
      <img src={place.thumbnail} className="w-68 h-68 rounded-6 bg-bg" />
      <div className="flex flex-col items-start flex-1 gap-y-8">
        <h6 className="text-17 font-semibold tracking-[0.75px]">
          {place.name}
        </h6>
        <p className="text-14 tracking-[0.14px] text-gray500">
          <PlaceCategory
            category={place.category}
            className="text-14 tracking-[0.14px]"
          />
          {place.address}
        </p>
        <div className="flex text-14 tracking-[0.14px] text-gray600 ">
          <span>
            <HeartIcon className="inline-block mr-4" />
            {place.likes}
          </span>
          <span>
            <StarIcon className="inline-block mr-4" />
            {place.rating}
          </span>
        </div>
      </div>
      <button className="relative" onClick={() => onAddPlace(place)}>
        <PlusRectIcon />
        <PlusIcon className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
      </button>
    </div>
  );
}
