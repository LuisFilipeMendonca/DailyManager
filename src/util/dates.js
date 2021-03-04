import { days, months } from "../constants/dates";

export const timeWithoutSec = (time) => {
  if (!time) return null;
  return time.slice(0, time.length - 3);
};

export const dateFormated = (date, isInput) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const weekDay = newDate.getDay();
  let month = newDate.getMonth();
  const year = newDate.getFullYear();

  if (isInput) {
    month++;
    return `${year}-${month > 9 ? month : "0" + month}-${
      day > 9 ? day : "0" + day
    }`;
  }

  return `${days[weekDay]}, ${day} ${months[month]}, ${year}`;
};
