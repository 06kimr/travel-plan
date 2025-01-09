import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItineraryController from "../../components/common/itineray/ItineraryController";
import Loading from "../../components/common/Loading";
import WideLayout from "../../components/common/WideLayout";
import useGenerateItinerary from "../../hooks/itinerary/useGenerateItinerary";
import { usePlanStore } from "../../store";
import { ItineraryItem } from "../../types";

export default function ItineraryCity() {
  const { generateItinerary } = useGenerateItinerary();

  const { plannedPlaces, dailyTimes } = usePlanStore();
  const navigate = useNavigate();
  const { city } = useParams();

  const [itinerary, setItinerary] = useState<
    ItineraryItem[][] | null
  >(null);

  useEffect(() => {
    if (plannedPlaces.length === 0 || dailyTimes.length === 0) {
      navigate(`/plan/${city}`);
      return;
    }

    generateItinerary(plannedPlaces, dailyTimes).then((itinerary) => {
      setItinerary(itinerary);
    });
  }, [dailyTimes, generateItinerary, plannedPlaces, navigate, city]);

  return (
    <WideLayout>
      {!itinerary ? (
        <Loading />
      ) : (
          <ItineraryController itinerary={itinerary} />

      )}
    </WideLayout>
  );
}
