import { PropsWithChildren } from "react";
import { usePlanStore } from "../../store";
import DailyTimeController from "./DailyTimeController";
import PlaceContainer from "./PlaceContainer";
import PlaceController from "./PlaceController";
import PlanControllerHeader from "./PlanControllerHeader";
import Wizard from "./Wizard";
import AccommodationContainer from "./AccommodationContainer";

export default function PlanController() {
  const { startDate, endDate } = usePlanStore();
  return (
    <div className="flex h-full">
      <Wizard
        steps={[
          {
            title: "날짜 확인",
            content: ({ onNext }) => (
              <div className="flex flex-col h-full px-24 overflow-y-hidden py-30 gap-y-18">
                <PlanControllerHeader startDate={startDate} endDate={endDate} />
                <DailyTimeController onCompleted={onNext} />
              </div>
            ),
          },
          {
            title: "장소 선택",
            content: () => (
              <div className="flex">
                <div className="flex flex-col h-full px-24 overflow-y-hidden py-30 gap-y-18">
                  <PlanControllerHeader
                    startDate={startDate}
                    endDate={endDate}
                  />

                  <div className="h-full">
                    <div className="p-14 border-b-3 border-b-main mb-18">
                      <h4 className="font-semibold text-18 text-main">
                        장소 선택
                      </h4>
                    </div>
                    <PlaceContainer />
                  </div>
                </div>
                <div className="px-24 py-30 ">
                  <PlaceController />
                </div>
              </div>
            ),
          },
          {
            title: "숙소 선택",
            content: () => (
              <div className="flex">
                <div className="flex flex-col h-full px-24 overflow-y-hidden py-30 gap-y-18">
                  <PlanControllerHeader
                    startDate={startDate}
                    endDate={endDate}
                  />

                  <div className="h-full">
                    <div className="p-14 border-b-3 border-b-main mb-18">
                      <h4 className="font-semibold text-18 text-main">
                        숙소 선택
                      </h4>
                    </div>
                    <AccommodationContainer />
                  </div>
                </div>
                <div className="px-24 py-30 ">
                  {/* <PlaceController /> */}
                </div>
              </div>
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
