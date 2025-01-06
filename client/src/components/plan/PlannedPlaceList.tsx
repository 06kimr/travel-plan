import { categories } from "../../constants";
import { Place } from "../../types";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import { useState } from "react";
import { parseMinutesToTime } from "../../utils/time";
import Button from "../common/Button";

interface Props {
  plannedPlaces: {
    place: Place;
    duration: number;
  }[];
  onDeletePlace: (index: number) => void;
  onEditDuration: (index: number, duration: number) => void;
}

export default function PlannedPlaceList({
  plannedPlaces,
  onDeletePlace,
  onEditDuration,
}: Props) {
  return (
    <div>
      {plannedPlaces.map((plannedPlace, index) => (
        <PlannedPlace
          plannedPlace={plannedPlace}
          index={index}
          onDeletePlace={() => onDeletePlace(index)}
          onEditDuration={(duration: number) => onEditDuration(index, duration)}
        />
      ))}
    </div>
  );
}

function PlannedPlace({
  plannedPlace,
  index,
  onDeletePlace,
  onEditDuration,
}: {
  plannedPlace: { place: Place; duration: number };
  index: number;
  onDeletePlace: () => void;
  onEditDuration: (duration: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const { hours, minutes } = parseMinutesToTime(plannedPlace.duration);
  const [newHours, setNewHours] = useState(hours);
  const [newMinutes, setNewMinutes] = useState(minutes);
  return (
    <div className="flex items-center mb-20" key={`${plannedPlace.place.name}`}>
      <span className="inline-block rounded-full w-30 h-30 text-white text-16 font-semibold tracking-[0.16px] bg-main leading-[30px] align-middle text-center mr-10">
        {index + 1}
      </span>
      <div className="rounded-10 w-[390px]  h-68 border-gray200 border-1 flex px-12 py-10 items-center ">
        {!editing ? (
          <>
            <img
              src={plannedPlace.place.thumbnail}
              className="w-48 h-48 mr-12 shrink-0 rounded-6"
            />
            <div className="flex-1 mr-12 overflow-hidden">
              <h6 className="text-15 font-semibold tracking-[0.15px] mb-8">
                {plannedPlace.place.name}
              </h6>
              <p className="text-14 tracking-[0.14px] text-gray500 overflow-hidden whitespace-nowrap text-ellipsis">
                <span className="font-medium text-main">
                  {categories[plannedPlace.place.category]}
                </span>
                {plannedPlace.place.address}
              </p>
            </div>
            <Button
              variant="action"
              className="shrink-0"
              onClick={() => setEditing(true)}
            >
              {hours}시간 {minutes}분
            </Button>
            <button onClick={() => onDeletePlace()}>
              <DeleteIcon />
            </button>
          </>
        ) : (
          <>
            <span className="text-15 font-semibold tracking-[0.15px]">
              머무는 시간
            </span>
            <div className="flex-1 text-center">
              <input
                type="number"
                value={newHours}
                className="text-20 font-semibold tracking-[0.2px] text-right"
                max={12}
                min={0}
                onChange={(e) => setNewHours(Number(e.currentTarget.value))}
              />
              <span className="text-15 font-medium tracking-[0.15px]">
                시간
              </span>
              <input
                type="number"
                value={newMinutes}
                className="text-20 font-semibold tracking-[0.2px] text-right"
                max={59}
                min={0}
                onChange={(e) => setNewMinutes(Number(e.currentTarget.value))}
              />
              <span className="text-15 font-medium tracking-[0.15px] text-right">
                분
              </span>
            </div>
            <Button
              variant="action"
              onClick={() => {
                setEditing(false);
                onEditDuration(newHours * 60 + newMinutes);
              }}
            >
              완료
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
