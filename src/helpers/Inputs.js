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
    const targetId = target.type === "radio" ? target.name : target.id;
    const inputIdx = this.getInputIdx(targetId);

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

  setDBErrors(errors, store) {
    errors.forEach((error) => {
      this.isInvalidHandler({ id: error.field });
      store.commit("toasts/addToast", {
        description: error.errorMsg,
        type: "error",
      });
    });
  }
}

export default Inputs;
