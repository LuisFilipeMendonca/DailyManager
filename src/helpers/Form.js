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

  buildFormObj(isEditing) {
    const data = {};

    console.log(isEditing);

    Object.keys(this.inputs).forEach((input) => {
      data[input] = this.inputs[input].value;
    });

    return data;
  }
}

export default Form;
