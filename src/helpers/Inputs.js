class Inputs {
  constructor(inputs) {
    this._inputs = inputs;
  }

  get inputs() {
    return this._inputs;
  }

  changeHandler(target) {
    const inputIdx = this.inputs.findIndex((input) => input.id === target.id);
    this.inputs[inputIdx].value = target.value;
  }

  focusHandler(target) {
    const inputIdx = this.inputs.findIndex((input) => input.id === target.id);
    this.inputs[inputIdx].isValid = true;
  }

  isInvalidHandler(target) {
    const inputIdx = this.inputs.findIndex((input) => input.id === target.id);
    this.inputs[inputIdx].isValid = false;
  }

  clearValues() {
    this._inputs = this.inputs.map((input) => ({ ...input, value: "" }));
  }
}

export default Inputs;
