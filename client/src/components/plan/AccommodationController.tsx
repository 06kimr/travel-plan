import { usePlanStore } from "../../store";
import PlannedAccommodationList from "./PlannedAccommodationList";

export default function AccommodationController() {
  const { plannedAccommodations, removePlannedAccommodation, startDate } = usePlanStore();
  const plannedAccommodationLength =
    plannedAccommodations.filter(Boolean).length;
  const accommodationCount = new Set(plannedAccommodations).size;
  return (
    <div className="flex flex-col text-left">
      <h5 className="flex items-end mb-13">
        <span className="text-30 font-medium tracking-[0.3px] mr-8">
          {accommodationCount}
        </span>
        <span className="text-15 tracking-[0.15px] mb-4">
          {plannedAccommodationLength}일 / {plannedAccommodations.length}일
        </span>
      </h5>

      <PlannedAccommodationList
        plannedAccommodations={plannedAccommodations}
        onDeleteAccommodation={removePlannedAccommodation}
        startDate ={startDate!}
      />
    </div>
  );
}
