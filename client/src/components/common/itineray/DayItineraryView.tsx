import SubwayIcon from "../../../assets/icons/directions_subway.svg?react";
import { ItineraryItem } from "../../../types";
import PlaceCategory from "../PlaceCategory";

interface Props {
  plannedPlaces: ItineraryItem[];
}

export default function DayItineraryView({ plannedPlaces }: Props) {
  return (
    <div className="flex flex-col gap-y-50" data-testid="itinerary-card">
      {plannedPlaces.map(({ place, startTime, endTime }) => (
        <div
          key={`${place.name}`}
          className="flex w-[253px] pl-29 relative before:absolute before:left-10 before:block before:bg-gray200 before:w-1 before:h-69 before:top-35 last:before:h-0"
        >
          <SubwayIcon className="absolute top-0 left-0" />
          <div className="flex flex-col flex-1 text-left gap-y-8">
            <p className="text-gray500 text-14">
              {startTime} - {endTime}
            </p>
            <PlaceCategory category={place.category} className="text-13" />
            <p className="font-semibold text-gray900 text-16 ">{place.name}</p>
          </div>
          <img
            src={place.thumbnail}
            className="w-75 h-55 shrink-0 rounded-6 bg-bg"
          />
        </div>
      ))}
    </div>
  );
}
