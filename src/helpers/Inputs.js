class Inputs {
  constructor(inputs) {
    this._inputs = inputs;
  }

  get inputs() {
    return this._inputs;
  }

  getInputValue(id) {
    const inputIdx = this.getInputIdx(id);
    return this._inputs[inputIdx].value;
  }

  getInputIdx(id) {
    return this.inputs.findIndex((input) => input.id === id);
  }

  changeHandler(target) {
    const inputIdx = this.getInputIdx(target.id);

    if (target.type === "file") {
      this.inputs[inputIdx].value = target.files[0];
    } else {
      this.inputs[inputIdx].value = target.value;
    }
  }

  focusHandler(target) {
    const inputIdx = this.getInputIdx(target.id);
    this.inputs[inputIdx].isValid = true;
  }

  isInvalidHandler(target) {
    const inputIdx = this.getInputIdx(target.id);
    this.inputs[inputIdx].isValid = false;
  }

  clearValues() {
    this._inputs = this.inputs.map((input) => ({ ...input, value: "" }));
  }

  setInputsData(data) {
    this._inputs.forEach((input) => {
      if (input.type === "file" && data["photo"]) {
        input.value = data["photoUrl"];
      } else {
        input.value = data[input.id];
      }
    });
  }
}

export default Inputs;