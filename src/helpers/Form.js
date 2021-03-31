class Form {
  constructor(inputs) {
    this.formInputs = inputs;
  }

  buildFormData(isEditing) {
    const inputs = this.formInputs.inputs;
    const formData = new FormData();

    inputs.forEach((input) => {
      if (isEditing) {
        formData.append(input.id, input.value);
      } else if (input.value && !isEditing) {
        formData.append(input.id, input.value);
      }
    });

    return formData;
  }
  buildFormObj() {
    const inputs = this.formInputs.inputs;
    const data = {};
    inputs.forEach((input) => {
      data[input.id] = input.value;
    });
    return data;
  }

  isValid(store) {
    const inputs = this.formInputs.inputs;
    let isFormValid = true;

    inputs.forEach((input) => {
      if (
        (input.value && input.value.length !== 0 && !input.isRequired) ||
        input.isRequired
      ) {
        const isInputValid = input.validator(input);

        if (!isInputValid) {
          this.formInputs.isInvalidHandler(input);
          store.commit("toasts/addToast", {
            description: input.errorMsg,
            type: "error",
          });
          isFormValid = false;
        }
      }
    });

    return isFormValid;
  }
}

export default Form;
