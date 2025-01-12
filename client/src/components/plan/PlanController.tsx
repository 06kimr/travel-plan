import { useNavigate, useParams } from "react-router-dom";
import { usePlanStore } from "../../store";
import AccommodationContainer from "./AccommodationContainer";
import AccommodationController from "./AccommodationController";
import DailyTimeController from "./DailyTimeController";
import PlaceContainer from "./PlaceContainer";
import PlaceController from "./PlaceController";
import PlanControllerHeader from "../common/shared/ControllerHeader";
import Wizard from "./Wizard";
import { City } from "../../types";

export default function PlanController({ city }: { city: City }) {
  const { startDate, endDate } = usePlanStore();
  const { city: cityId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex h-full">
      <Wizard
        onCompleted={() => {
          navigate(`/itinerary/${cityId}`);
        }}
        steps={[
          {
            title: "날짜 확인",
            content: ({ onNext }) => (
              <div className="flex flex-col h-full px-24 overflow-y-hidden py-30 gap-y-18">
                <PlanControllerHeader
                  startDate={startDate}
                  endDate={endDate}
                  cityName={city.country.name}
                />
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
                    cityName={city.country.name}
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
                    cityName={city.country.name}
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
                  <AccommodationController />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
