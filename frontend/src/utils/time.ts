import { getHours, getMinutes } from "date-fns";

export const formatHour = (hour: number, minutes: number) => {
  let formattedMinutes = String(minutes);
  if (minutes < 10) {
    formattedMinutes = `0${minutes}`;
  }
  return `${hour}:${formattedMinutes}`;
};

export const toTime = (date: Date) => {
  return {
    hour: getHours(date),
    minutes: getMinutes(date)
  };
};
