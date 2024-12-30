import { usePlanStore } from "../../store";
import DailyTimeSelector from "./DailyTimeSelector";
import PlanControllerHeader from "./PlanControllerHeader";
import PlanSteps from "./PlanSteps";

export default function PlanController() {
  const { startDate, endDate } = usePlanStore();
  return (
    <div className="flex h-full">
      <PlanSteps />
      <div className="flex flex-col px-24 py-30 gap-y-18">
        <PlanControllerHeader startDate={startDate} endDate={endDate} />
        <DailyTimeSelector />
      </div>
    </div>
  );
}
