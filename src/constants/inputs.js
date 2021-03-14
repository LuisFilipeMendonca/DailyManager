import Validator from "../helpers/Validator";

export const loginInputs = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Your email...",
    value: "",
    isValid: true,
    isRequired: true,
    errorMsg: "Your email is invalid",
    validator: Validator.isEmail,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Your password...",
    value: "",
    isRequired: true,
    isValid: true,
    errorMsg: "Your password is invalid",
    minLength: 8,
    validator: Validator.hasLength,
  },
];

export const registerInputs = [
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Your first name...",
    value: "",
    isRequired: true,
    isValid: true,
    errorMsg: "First name is required",
    validator: Validator.hasValue,
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Your last name...",
    value: "",
    isRequired: true,
    isValid: true,
    errorMsg: "Last name is required",
    validator: Validator.hasValue,
  },
];
