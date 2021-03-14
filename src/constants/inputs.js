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
  },
];
