class Validator {
  constructor() {}

  static hasValue(target) {
    const { value } = target;
    return value.trim().length > 0;
  }

  static isEmail(target) {
    const { value } = target;
    const emailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
  }

  static hasLength(target) {
    const { value, minLength, maxLength = Infinity } = target;
    return value.trim().length >= minLength && value.trim().length <= maxLength;
  }

  static isFileValid(target) {
    const { value, validExtensions } = target;

    if (typeof value === "string") return true;

    return validExtensions.some((extension) => extension === value.type);
  }

  static isTimeValid(target) {
    const { value } = target;
    const hours = +value.slice(0, 2);
    const mins = +value.slice(-2);
    return hours < 24 && mins < 59 && !isNaN(hours) && !isNaN(hours);
  }

  static isDateValid(target) {
    const { value } = target;
    const atualDate = new Date();
    const atualDateWithoutTime = new Date(
      atualDate.getFullYear(),
      atualDate.getMonth(),
      atualDate.getDate()
    ).getTime();
    const inputDate = new Date(value).getTime();
    return atualDateWithoutTime <= inputDate;
  }

  static isDateBeforeTomorrow(target) {
    const date = new Date(
      new Date(target.value).getFullYear(),
      new Date(target.value).getMonth(),
      new Date(target.value).getDate()
    ).getTime();
    const atualDate = new Date();
    const atualDateWithoutTime = new Date(
      atualDate.getFullYear(),
      atualDate.getMonth(),
      atualDate.getDate()
    ).getTime();

    return atualDateWithoutTime >= date;
  }

  static isPositiveNumber(target) {
    const value = parseInt(target.value);
    return !isNaN(value) && value >= 0;
  }
}

export default Validator;
