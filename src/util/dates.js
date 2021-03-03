import { days, months } from "../constants/dates";

export const timeWithoutSec = (time) => {
  if (!time) return null;
  return time.slice(0, time.length - 3);
};

export const dateFormated = (date) => {
  const day = date.getDate();
  const weekDay = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${days[weekDay]}, ${day} ${months[month]}, ${year}`;
};
