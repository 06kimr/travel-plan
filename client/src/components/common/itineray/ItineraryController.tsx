import { usePlanStore } from "../../../store";
import { City, ItineraryItem } from "../../../types";
import Tabs from "../../plan/Tabs";
import ControllerHeader from "../shared/ControllerHeader";
import DayItineraryView from "./DayItineraryView";
import ItineraryMapContainer from "./ItineraryMapContainer";

interface Props {
  itinerary: ItineraryItem[][];
  city: City;
}

export default function ItineraryController({ itinerary, city }: Props) {
  const { startDate, endDate, plannedAccommodations } = usePlanStore();
  return (
    <div className="h-full">
      <Tabs
        className="h-full"
        tabs={itinerary.map((day, index) => ({
          title: `${index + 1}일차`,
          content: () => (
            <div className="flex flex-1 h-full">
              <div className="flex flex-col flex-shrink-0 h-full px-24 overflow-y-hidden py-30 gap-y-18">
                <ControllerHeader
                  startDate={startDate}
                  endDate={endDate}
                  cityName={city.country.name}
                />
                <DayItineraryView plannedPlaces={day} />
              </div>
              <ItineraryMapContainer
                plannedPlaces={day}
                accommodation={plannedAccommodations[index]!}
              />
            </div>
          ),
        }))}
      />
    </div>
  );
}
