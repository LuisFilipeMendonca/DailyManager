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
}

export default Validator;
