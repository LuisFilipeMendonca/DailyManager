<template>
  <base-form
    :submitHandler="submitHandler"
    :submitDescription="isLogging ? 'Login' : 'Register'"
  >
    <template v-slot:form-header>
      <h2>{{ isLogging ? "Login" : "Register" }}</h2>
    </template>
    <template v-slot:form-inputs>
      <base-input
        v-for="input in inputs"
        :key="input.id"
        :id="input.id"
        :label="input.label"
        :type="input.type"
        :placeholder="input.placeholder"
        :value="input.type === 'file' ? input.showValue : input.value"
        :isValid="input.isValid"
        @file-change-handler="fileChangeHandler"
        @focus-handler="focusHandler"
      />
    </template>
    <template v-slot:form-aditional-action>
      <base-button type="button" mode="unstyled" @click="toggleFormHandler"
        >Change to {{ isLogging ? "Register" : "Login" }}</base-button
      >
    </template>
  </base-form>
</template>

<script>
import {
  loginInputs as LoginInputs,
  registerInputs as RegisterInputs,
} from "../constants/inputs";
import Inputs from "../helpers/Inputs";
import Form from "../helpers/Form";

const loginInputs = new Inputs(LoginInputs);
const registerInputs = new Inputs([...RegisterInputs, ...LoginInputs]);

export default {
  data() {
    return {
      isLogging: true,
      inputsData: loginInputs,
    };
  },
  methods: {
    toggleFormHandler() {
      this.isLogging = !this.isLogging;

      if (this.isLogging) {
        this.inputsData = loginInputs;
      } else {
        this.inputsData = registerInputs;
      }
      this.inputsData.clearValues();
    },
    submitHandler() {
      const form = new Form(this.inputsData);

      if (!form.isValid()) return;

      console.log("is valid");
    },
    fileChangeHandler(target) {
      this.inputsData.changeHandler(target);
    },
    focusHandler(target) {
      this.inputsData.focusHandler(target);
    },
  },
  computed: {
    inputs() {
      return this.inputsData.inputs;
    },
  },
};
</script>
