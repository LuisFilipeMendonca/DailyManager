import { months, days } from "../constants/dates";
import { addPadStart } from "../util/generics";

class Dates {
  constructor(date) {
    this.date = date ? new Date(date) : new Date();
  }

  setDate(date) {
    this.date = new Date(date);
  }

  getWeekDay() {
    return this.date.getDay();
  }

  getDay() {
    return this.date.getDate();
  }

  getMonth() {
    return this.date.getMonth();
  }

  getYear() {
    return this.date.getFullYear();
  }

  getDateParamsWithoutTime() {
    const weekDay = this.getWeekDay();
    const day = this.getDay();
    const month = this.getMonth();
    const year = this.getYear();
    return { weekDay, day, month, year };
  }

  getDateWithoutTime() {
    const { day, month, year } = this.getDateParamsWithoutTime();
    return new Date(year, month, day);
  }

  getTimestamps(date) {
    return date ? date.getTime() : this.date.getTime();
  }

  getTimestampsWithoutTime() {
    const date = this.getDateWithoutTime();
    return this.getTimestamps(date);
  }

  getInputDateFormat() {
    const { day, month, year } = this.getDateParamsWithoutTime();

    return `${year}-${addPadStart(month + 1, 2, 0)}-${addPadStart(day, 2, 0)}`;
  }

  getDateFormated() {
    const { weekDay, day, month, year } = this.getDateParamsWithoutTime();
    console.log(month);
    return `${days[weekDay]}, ${day} ${months[month].value}, ${year}`;
  }

  static isSameTimestamps(value1, value2) {
    return value1 === value2;
  }

  static isSameYear(value1, value2) {
    return +value1 === +value2;
  }
}

export default Dates;
