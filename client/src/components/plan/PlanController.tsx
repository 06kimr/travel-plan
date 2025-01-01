import { PropsWithChildren } from "react";
import { usePlanStore } from "../../store";
import DailyTimeController from "./DailyTimeController";
import PlanControllerHeader from "./PlanControllerHeader";
import Wizard from "./Wizard";
import PlaceController from "./PlaceController";

export default function PlanController() {
  const { startDate, endDate } = usePlanStore();
  return (
    <div className="flex h-full">
      <Wizard
        steps={[
          {
            title: "날짜 확인",
            content: ({ onNext }) => (
              <Layout startDate={startDate} endDate={endDate}>
                <DailyTimeController onCompleted={onNext} />
              </Layout>
            ),
          },
          {
            title: "장소 선택",
            content: () => (
              <Layout startDate={startDate} endDate={endDate}>
                <PlaceController />
              </Layout>
            ),
          },
          {
            title: "숙소 선택",
            content: () => (
              <Layout startDate={startDate} endDate={endDate}>
                <div>숙소 선택</div>
              </Layout>
            ),
          },
        ]}
      />
    </div>
  );
}

function Layout({
  children,
  startDate,
  endDate,
}: PropsWithChildren<{ startDate: Date | null; endDate: Date | null }>) {
  return (
    <div className="flex flex-col h-full px-24 overflow-y-hidden py-30 gap-y-18">
      <PlanControllerHeader startDate={startDate} endDate={endDate} />
      {children}
    </div>
  );
}
