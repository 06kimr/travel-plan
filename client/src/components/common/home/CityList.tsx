import { City } from "../../../../../server/types";
import Card from "./Card";

interface Props {
  cities: City[];
}

export default function CityList({ cities }: Props) {
  return (
    <div className="flex flex-wrap justify-between gap-y-28">
      {cities.map((city: City) => (
        <Card
          key={city.city}
          title={city.name}
          description={city.description}
          image={city.thumbnail}
        />
      ))}
    </div>
  );
}