import { PlanState } from "../../store";
import { ItineraryItem } from "../../types";
import {
  parseTime,
  timeToString,
  transformTimeToMinute,
} from "../../utils/time";

export default function useGenerateItinerary() {
  return {
    generateItinerary,
  };
}

function getMatrix(
  locations: { lat: number; lng: number }[]
): Promise<google.maps.DistanceMatrixResponse> {
  const distanceMatrixService = new google.maps.DistanceMatrixService();

  return new Promise((resolve, reject) => {
    const request: google.maps.DistanceMatrixRequest = {
      origins: locations,
      destinations: locations,
      travelMode: google.maps.TravelMode.TRANSIT,
    };
    distanceMatrixService.getDistanceMatrix(request, (response, status) => {
      if (status === google.maps.DistanceMatrixStatus.OK) {
        resolve(response!);
      } else {
        reject(status);
      }
    });
  });
}

async function generateItinerary(
  places: PlanState["plannedPlaces"],
  dailyTimes: PlanState["dailyTimes"]
) {
  const locations = places.map(({ place }) => place.coordinates);
  const matrix = await getMatrix(locations);
  const route = findOptimalRoute(matrix);
  const itinerary = groupPlacesByDay({ route, places, matrix }, dailyTimes);
  return itinerary;
}

function findOptimalRoute(matrix: google.maps.DistanceMatrixResponse) {
  const length = matrix.rows.length;

  const visited = new Set<number>();
  const route = [0];
  visited.add(0);

  while (visited.size < length) {
    let min = Infinity;
    let next = -1;
    const current = route[route.length - 1];

    for (let i = 0; i < length; i++) {
      if (visited.has(i)) {
        continue;
      }

      const distance = matrix.rows[current].elements[i].distance.value;
      if (distance < min) {
        min = distance;
        next = i;
      }
    }

    if (next !== -1) {
      route.push(next);
      visited.add(next);
    }
  }

  return route;
}
const THRESHOLD = 10_000;
function groupPlacesByDay(
  {
    route,
    places,
    matrix,
  }: {
    route: number[];
    places: PlanState["plannedPlaces"];
    matrix: google.maps.DistanceMatrixResponse;
  },
  dailyTimes: PlanState["dailyTimes"]
) {
  const itinerary: ItineraryItem[][] = [];
  let dailyDuration = 0;
  let dailyTime = getDailyTimes(dailyTimes[0]);

  route.forEach((placeIndex, index) => {
    if (itinerary.length === 0) {
      const endTime =
        transformTimeToMinute(dailyTimes[0].startTime) +
        places[placeIndex].duration;
      itinerary.push([
        {
          ...places[placeIndex],
          startTime: dailyTimes[0].startTime,
          endTime: timeToString(parseTime(endTime)),
          duration: places[placeIndex].duration,
        },
      ]);
      dailyDuration = places[placeIndex].duration;
      return;
    }

    const day = itinerary[itinerary.length - 1];
    const lastPlaceIndex = route[index - 1];
    const distance =
      matrix.rows[lastPlaceIndex].elements[placeIndex].distance.value;
    const duration =
      matrix.rows[lastPlaceIndex].elements[placeIndex].distance.value / 60; //in minutes
    dailyDuration += duration;

    if (distance > THRESHOLD || dailyDuration > dailyTime) {
      dailyTime = getDailyTimes(dailyTimes[itinerary.length]);
      const endTime =
        transformTimeToMinute(dailyTimes[0].startTime) +
        places[placeIndex].duration;

      itinerary.push([
        {
          ...places[placeIndex],
          startTime: dailyTimes[itinerary.length].startTime,
          endTime: timeToString(parseTime(endTime)),
        },
      ]);
      dailyDuration = places[placeIndex].duration;
    } else {
      const startTime =
        transformTimeToMinute(dailyTimes[itinerary.length - 1].startTime) +
        dailyDuration;
      const endTime = startTime + places[placeIndex].duration;
      day.push({
        ...places[placeIndex],
        startTime: timeToString(parseTime(startTime)),
        endTime: timeToString(parseTime(endTime)),
      });
      dailyDuration += places[placeIndex].duration;
    }
  });

  while (itinerary.length < dailyTimes.length) {
    const max = itinerary.reduce((acc, day, index) => {
      if (day.length > itinerary[acc].length) {
        return index;
      }
      return acc;
    }, 0);

    if (itinerary[max].length === 1) {
      break;
    }

    const day = itinerary[max];
    const half = Math.floor(day.length / 2);
    itinerary[max] = day.slice(0, half);
    itinerary.push(day.slice(half));
  }
  return itinerary;
}

function getDailyTimes({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) {
  const start = transformTimeToMinute(startTime);
  const end = transformTimeToMinute(endTime);
  return end - start;
}
