class Form {
  constructor(inputs) {
    this.formInputs = inputs;
  }

  buildFormData(isEditing) {
    const formData = new FormData();

    Object.keys(this.inputs).forEach((input) => {
      if (isEditing) {
        formData.append(input, this.inputs[input].value);
      } else if (this.inputs[input].value && !isEditing) {
        formData.append(input, this.inputs[input].value);
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

  isValid() {
    const inputs = this.formInputs.inputs;
    let isFormValid = true;

    inputs.forEach((input) => {
      if ((input.value.length !== 0 && !input.isRequired) || input.isRequired) {
        const isInputValid = input.validator(input);

        if (!isInputValid) {
          this.formInputs.isInvalidHandler(input);
          isFormValid = false;
        }
      }
    });

    return isFormValid;
  }
}

export default Form;
