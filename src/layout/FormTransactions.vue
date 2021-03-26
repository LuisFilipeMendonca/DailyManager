<template>
  <section class="section">
    <base-form
      :submitHandler="submitHandler"
      :submitDescription="isEditing ? 'Edit Task' : 'Add Transaction'"
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
        <base-button :isLink="true" path="/tasks" type="button" mode="unstyled"
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
  data() {
    return {
      inputsData: new Inputs(transactionInputs),
    };
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    },
    inputs() {
      console.log(this.inputsData.inputs);
      return this.inputsData.inputs;
    },
  },
  watch: {
    $route(to, from) {
      if (from.params.id && !to.params.id) {
        this.inputsData.clearValues();
        return;
      }

      this.getTask();
    },
  },
  methods: {
    async submitHandler() {
      try {
        const form = new Form(this.inputsData);

        if (!form.isValid()) return;

        const formData = form.buildFormObj();

        await this.$store.dispatch("todos/storeUpdateTask", {
          formData,
          isEditing: this.isEditing,
          taskId: +this.$route.params.id,
          atualDate: +this.$route.query.date,
        });

        this.$router.replace("/tasks");
      } catch (e) {
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
};
</script>
