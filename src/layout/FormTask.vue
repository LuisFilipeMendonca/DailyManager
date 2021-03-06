<template>
  <section class="section">
    <base-form
      :submitHandler="submitHandler"
      :submitDescription="isEditing ? 'Edit Task' : 'Add Task'"
      :isBtnLoading="isLoading"
    >
      <template v-slot:form-header>
        <h2>{{ isEditing ? "Edit" : "Add" }} Task</h2>
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
          @change-handler="changeHandler"
          @focus-handler="focusHandler"
        />
      </template>
      <template v-slot:form-aditional-action>
        <base-button @click="goBackHandler" type="button" mode="danger"
          >Cancel</base-button
        >
      </template>
    </base-form>
  </section>
</template>

<script>
import Form from "../helpers/Form";
import Inputs from "../helpers/Inputs";
import { taskInputs } from "../constants/inputs";

export default {
  inject: ["errorHandler"],
  data() {
    return {
      inputsData: new Inputs(taskInputs),
      isLoading: false,
    };
  },
  created() {
    this.inputsData.clearValues();

    this.getTask();
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    },
    inputs() {
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
      const form = new Form(this.inputsData);

      if (!form.isValid(this.$store)) return;

      this.isLoading = true;
      try {
        const formData = form.buildFormObj();

        await this.$store.dispatch("todos/storeUpdateTask", {
          formData,
          isEditing: this.isEditing,
          taskId: +this.$route.params.id,
          atualDate: +this.$route.query.date,
        });

        this.isLoading = false;
        this.$router.replace("/tasks");
        this.$store.commit("toasts/addToast", {
          description: "Your task was successfully added",
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
    getTask() {
      const taskId = +this.$route.params.id;

      if (!taskId) return;
      const taskData = this.$store.getters["todos/getTask"](taskId);

      if (!taskData) {
        this.$router.replace("/tasks");
        return;
      }

      this.inputsData.setInputsData(taskData);
    },
    goBackHandler() {
      this.$router.back();
    },
  },
};
</script>
