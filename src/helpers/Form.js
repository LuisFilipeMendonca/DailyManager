class Form {
  constructor(inputs) {
    this.inputs = inputs;
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
    const data = {};
    Object.keys(this.inputs).forEach((input) => {
      data[input] = this.inputs[input].value;
    });
    return data;
  }

  isValid() {
    const inputs = this.inputs._inputs;
    let isFormValid = true;

    inputs.forEach((input) => {
      const isInputValid = input.validator(input);

      if (!isInputValid) {
        this.inputs.isInvalidHandler(input);
        isFormValid = false;
      }
    });

    return isFormValid;
  }
}

export default Form;
