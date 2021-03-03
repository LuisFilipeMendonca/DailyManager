<template>
  <base-form
    :submitHandler="submitHandler"
    :submitDescription="isEditing ? 'Edit Task' : 'Add Task'"
  >
    <template v-slot:form-header>
      <h2>{{ isEditing ? "Edit" : "Add" }} Task</h2>
    </template>
    <template v-slot:form-inputs>
      <base-input
        v-for="(input, name) in inputs"
        :key="name"
        :id="name"
        :type="input.type"
        :placeholder="input.placeholder"
        :value="input.type === 'file' ? input.showValue : input.value"
        @file-change-handler="fileChangeHandler"
      />
    </template>
    <template v-slot:form-aditional-action>
      <base-button :isLink="true" path="/tasks" type="button" mode="unstyled"
        >Cancel</base-button
      >
    </template>
  </base-form>
</template>

<script>
import Form from "../helpers/Form";

export default {
  data() {
    return {
      inputs: {
        description: {
          type: "text",
          value: "",
          placeholder: "Task description",
          isValid: true,
          isRequired: true,
          errorMsg: "A description is required",
        },
        time: {
          type: "time",
          value: null,
          isValid: true,
          isRequired: false,
        },
        date: {
          type: "date",
          value: null,
          isValid: true,
          isRequired: true,
        },
      },
    };
  },
  created() {
    const taskId = +this.$route.params.id;

    if (!taskId) return;

    const taskData = this.$store.getters["todos/getTask"](taskId);
    this.addTaskData(taskData);
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    submitHandler() {
      const formData = new Form(this.inputs).buildFormObj(this.isEditing);
      this.$store.dispatch("todos/storeUpdateTask", {
        formData,
        isEditing: this.isEditing,
        taskId: +this.$route.params.id,
      });
    },
    fileChangeHandler(target) {
      this.inputs[target.id].value = target.value;
    },
    addTaskData(data) {
      Object.keys(this.inputs).forEach((input) => {
        this.inputs[input].value = data[input];
      });
    },
  },
};
</script>
