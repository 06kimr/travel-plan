export const transformTimeToMinute = (time: string) => {
  return parseInt(time.slice(0, 2), 10) * 60 + parseInt(time.slice(3), 10);
};

export const parseTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = Math.floor(minutes % 60);
  return {
    hours,
    minutes: remainMinutes,
  };
};

export const printTime = ({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) => {
  return `${hours}시간 ${minutes}분`;
};

export const getTotalTime = (
  times: { startTime: string; endTime: string }[]
) => {
  return times.reduce((acc, dailyTime) => {
    const dailyTotalTime =
      transformTimeToMinute(dailyTime.endTime) -
      transformTimeToMinute(dailyTime.startTime);
    return acc + dailyTotalTime;
  }, 0);
};

export const timeToString = ({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) => {
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
