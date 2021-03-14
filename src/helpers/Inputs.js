class Inputs {
  constructor(inputs) {
    this._inputs = inputs;
  }

  get inputs() {
    return this._inputs;
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
}

export default Inputs;
