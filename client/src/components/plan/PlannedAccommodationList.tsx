import { addDays, format } from "date-fns";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import { categories } from "../../constants";
import { Place } from "../../types";

interface Props {
  plannedAccommodations: Array<Place | null>;
  onDeleteAccommodation: (index: number) => void;
  startDate: Date;
}

export default function PlannedAccommodationList({
  plannedAccommodations,
  onDeleteAccommodation,
  startDate,
}: Props) {
  return (
    <div>
      {plannedAccommodations.map((plannedAccommodation, index) => {
        const targetDate = addDays(startDate, index);
        return plannedAccommodation ? (
          <PlannedAccommodation
            plannedAccommodation={plannedAccommodation}
            index={index}
            key={`${PlannedAccommodation.name}_${index}`}
            onDeleteAccommodation={() => onDeleteAccommodation(index)}
            targetDate={targetDate}
          />
        ) : (
          <EmptyAccommodation index={index} targetDate={targetDate} />
        );
      })}
    </div>
  );
}

function EmptyAccommodation({
  index,
  targetDate,
}: {
  index: number;
  targetDate: Date;
}) {
  return (
    <div className="flex items-center mb-20">
      <span className="inline-block rounded-full w-30 h-30 text-white text-16 font-semibold tracking-[0.16px] bg-main leading-[30px] align-middle text-center mr-10">
        {index + 1}
      </span>
      <div className="rounded-10 w-[390px]  h-68 border-gray200 border-1 flex px-12 py-10 items-center ">
        <>
          <div className="w-48 h-48 mr-12 shrink-0 rounded-6 bg-bg" />
          <div className="flex-1 mr-12 overflow-hidden">
            <h6 className="text-15 font-semibold tracking-[0.15px] mb-8">
              숙소를 추가해 주세요.
            </h6>
            <p className="text-14 tracking-[0.14px] text-gray500 overflow-hidden whitespace-nowrap text-ellipsis">
              <span className="font-medium text-main">
                {categories["accommodation"]}
              </span>
              {format(targetDate, "MM.dd(EEE)")} -{" "}
              {format(addDays(targetDate, 1), "MM.dd(EEE)")}
            </p>
          </div>
        </>
      </div>
    </div>
  );
}

function PlannedAccommodation({
  plannedAccommodation,
  index,
  onDeleteAccommodation,
  targetDate,
}: {
  plannedAccommodation: Place;
  index: number;
  onDeleteAccommodation: () => void;
  targetDate: Date;
}) {
  return (
    <div className="flex items-center mb-20">
      <span className="inline-block rounded-full w-30 h-30 text-white text-16 font-semibold tracking-[0.16px] bg-main leading-[30px] align-middle text-center mr-10">
        {index + 1}
      </span>
      <div className="rounded-10 w-[390px]  h-68 border-gray200 border-1 flex px-12 py-10 items-center ">
        <>
          <img
            src={plannedAccommodation.thumbnail}
            className="w-48 h-48 mr-12 shrink-0 rounded-6"
          />
          <div className="flex-1 mr-12 overflow-hidden">
            <h6 className="text-15 font-semibold tracking-[0.15px] mb-8">
              {plannedAccommodation.name}
            </h6>
            <p className="text-14 tracking-[0.14px] text-gray500 overflow-hidden whitespace-nowrap text-ellipsis">
              <span className="font-medium text-main">
                {categories[plannedAccommodation.category]}
              </span>
              {format(targetDate, "MM.dd(EEE)")} -{" "}
              {format(addDays(targetDate, 1), "MM.dd(EEE)")}
            </p>
          </div>

          <button onClick={() => onDeleteAccommodation()}>
            <DeleteIcon />
          </button>
        </>
      </div>
    </div>
  );
}
