import { usePlanStore } from "../../store";
import { getTotalTime, parseMinutesToTime, printTime } from "../../utils/time";
import PlannedPlaceList from "./PlannedPlaceList";

export default function PlaceController() {
  const {
    plannedPlaces,
    removePlannedPlace,
    setDurationForPlannedPlace,
    dailyTimes,
  } = usePlanStore();
  const totalTime = getTotalTime(dailyTimes);
  const plannedTime = plannedPlaces.reduce(
    (acc, { duration }) => acc + duration,
    0
  );
  return (
    <div className="flex flex-col text-left">
      <h5 className="flex items-end mb-13">
        <span className="text-30 font-medium tracking-[0.3px] mr-8">0</span>
        <span className="text-15 tracking-[0.15px] mb-4">
          {printTime(parseMinutesToTime(plannedTime))} /{" "}
          {printTime(parseMinutesToTime(totalTime))}
        </span>
      </h5>
      {plannedPlaces.length === 0 ? (
        <EmptyList />
      ) : (
        <PlannedPlaceList
          plannedPlaces={plannedPlaces}
          onDeletePlace={removePlannedPlace}
          onEditDuration={setDurationForPlannedPlace}
        />
      )}
    </div>
  );
}

function EmptyList() {
  return (
    <div className="w-[430px] h-89 rounded-10 bg-bg">
      <p className="m-auto text-center mt-70 text-gray500 text-14">
        장소를 선택해 주세요
      </p>
    </div>
  );
}
