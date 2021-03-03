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
          value: "",
          isValid: true,
          isRequired: false,
        },
        date: {
          type: "date",
          value: "",
          isValid: true,
          isRequired: true,
        },
      },
    };
  },
  created() {
    const contactId = +this.$route.params.id;

    if (!contactId) return;

    const contactData = this.$store.getters["contacts/getContact"](contactId);
    this.addContactData(contactData);
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    submitHandler() {
      const formData = new Form(this.inputs).buildFormObj(this.isEditing);
      console.log(formData);
    },
    fileChangeHandler(target) {
      this.inputs[target.id].value = target.value;
    },
    addContactData(data) {
      Object.keys(this.inputs).forEach((input) => {
        if (this.inputs[input].type === "file") {
          this.inputs[input].showValue = data.photoUrl;
        } else {
          this.inputs[input].value = data[input];
        }
      });
    },
  },
};
</script>
