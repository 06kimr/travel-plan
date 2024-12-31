import { useQuery } from "@tanstack/react-query";
import WideLayout from "../../components/common/WideLayout";
import Map from "../../components/plan/Map";
import PlanController from "../../components/plan/PlanController";
import TravelPeriodModal from "../../components/plan/TravelPeriodModal";
import { usePlanStore } from "../../store";
import { useParams } from "react-router-dom";
import { getCity } from "../../services/plan";
import Loading from "../../components/common/Loading";

export default function PlanCity() {
  const { status } = usePlanStore();
  const {city: cityId = ""} = useParams();
  const {data, isLoading} = useQuery({
    queryKey: ['city', cityId],
    queryFn: () => getCity(cityId),
  })
  return (
    <>
      {status === "period_edit" && <TravelPeriodModal />}
      <WideLayout>
        {isLoading || !data ? <Loading />: (
        <div className="flex h-full">
          <PlanController />
          <div className="flex-1 bg-gray300">
            <Map center={data.coordinates} />
          </div>
        </div>
        )}
      </WideLayout>
    </>
  );
}
