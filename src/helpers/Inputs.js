class Inputs {
  constructor(inputs) {
    this.inputs = inputs;
  }

  get _inputs() {
    return this.inputs;
  }

  changeHandler(target) {
    const inputIdx = this.inputs.findIndex((input) => input.id === target.id);
    this.inputs[inputIdx].value = target.value;
  }

  isInvalidHandler(target) {
    console.log(target);
  }
}

export default Inputs;
