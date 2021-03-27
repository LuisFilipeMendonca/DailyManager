<template>
  <section class="section">
    <base-form
      :submitHandler="submitHandler"
      :submitDescription="isLogging ? 'Login' : 'Register'"
      :isBtnLoading="isLoading"
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
          :value="input.value"
          :isValid="input.isValid"
          @change-handler="changeHandler"
          @focus-handler="focusHandler"
        />
      </template>
      <template v-slot:form-aditional-action>
        <base-button type="button" mode="unstyled" @click="toggleFormHandler"
          >Change to {{ isLogging ? "Register" : "Login" }}</base-button
        >
      </template>
    </base-form>
  </section>
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
      isLoading: false,
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
    async submitHandler() {
      const form = new Form(this.inputsData);

      if (!form.isValid()) return;
      this.isLoading = true;
      try {
        const formData = form.buildFormObj();

        if (this.isLogging) {
          await this.$store.dispatch("auth/login", formData);
          this.isLoading = false;
          this.$router.replace("/");
        } else {
          await this.$store.dispatch("auth/register", formData);
          this.isLoading = false;
          this.toggleFormHandler();
        }
      } catch (e) {
        this.isLoading = false;
        console.log(e);
      }
    },
    changeHandler(target) {
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
