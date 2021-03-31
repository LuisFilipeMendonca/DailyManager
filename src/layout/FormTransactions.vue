<template>
  <section class="section">
    <base-form
      :submitHandler="submitHandler"
      :submitDescription="isEditing ? 'Edit Task' : 'Add Transaction'"
      :isBtnLoading="isLoading"
    >
      <template v-slot:form-header>
        <h2>{{ isEditing ? "Edit" : "Add" }} Transaction</h2>
      </template>
      <template v-slot:form-inputs>
        <base-input
          v-for="input in inputs"
          :key="input.id"
          :id="input.id"
          :type="input.type"
          :label="input.label"
          :placeholder="input.placeholder"
          :value="input.value"
          :isValid="input.isValid"
          :options="input.options"
          @change-handler="changeHandler"
          @focus-handler="focusHandler"
        />
      </template>
      <template v-slot:form-aditional-action>
        <base-button :isLink="true" path="/tasks" type="button" mode="danger"
          >Cancel</base-button
        >
      </template>
    </base-form>
  </section>
</template>

<script>
import Form from "../helpers/Form";
import Inputs from "../helpers/Inputs";
import { transactionInputs } from "../constants/inputs";

export default {
  inject: ["errorHandler"],
  data() {
    return {
      inputsData: new Inputs(transactionInputs),
      isLoading: false,
    };
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    },
    inputs() {
      return this.inputsData.inputs;
    },
  },
  methods: {
    async submitHandler() {
      const form = new Form(this.inputsData);

      if (!form.isValid(this.$store)) return;
      this.isLoading = true;
      try {
        const formData = form.buildFormObj();

        await this.$store.dispatch("account/storeTransaction", formData);

        this.isLoading = false;
        this.$router.replace("/expenses");
        this.$store.commit("toasts/addToast", {
          description: "Your transaction was successfully added",
          type: "success",
        });
      } catch (e) {
        this.isLoading = false;
        this.errorHandler(e, {
          inputs: this.inputsData,
          redirect: {
            name: "Authentication",
            query: { redirect: this.$route.path },
          },
        });
      }
    },
    changeHandler(target) {
      this.inputsData.changeHandler(target);
    },
    focusHandler(target) {
      this.inputsData.focusHandler(target);
    },
  },
};
</script>
