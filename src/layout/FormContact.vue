<template>
  <base-form :submitHandler="submitHandler" submitDescription="Add Contact">
    <template v-slot:form-header>
      <h2>Add Contact</h2>
    </template>
    <template v-slot:form-inputs>
      <base-input
        v-for="(input, name) in inputs"
        :key="name"
        :id="name"
        :type="input.type"
        :placeholder="input.placeholder"
        :value="input.value"
        @file-change-handler="fileChangeHandler"
      />
    </template>
    <template v-slot:form-aditional-action>
      <base-button :isLink="true" path="/contacts" type="button" mode="unstyled"
        >Cancel</base-button
      >
    </template>
  </base-form>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        contactPhoto: {
          type: "file",
          value: "",
          placeholder: "Contact name",
          isValid: true,
          isRequired: true,
          errorMsg: "A contact name is required",
        },
        name: {
          type: "text",
          value: "",
          placeholder: "Contact name",
          isValid: true,
          isRequired: true,
          errorMsg: "A contact name is required",
        },
        email: {
          type: "email",
          value: "",
          placeholder: "Contact email",
          isValid: true,
          isRequired: false,
          errorMsg: "Invalid email address",
        },
        phone: {
          type: "tel",
          value: "",
          placeholder: "Contact phone",
          isValid: true,
          isRequired: false,
          errorMsg: "Invalid phone number",
        },
        address: {
          type: "text",
          value: "",
          placeholder: "Contact address",
          isValid: true,
          isRequired: false,
          errorMsg: "Invalid address",
        },
      },
    };
  },
  created() {
    console.log(this.$route.params.id);
  },
  methods: {
    submitHandler() {
      console.log(this.inputs);
    },
    fileChangeHandler(target) {
      this.inputs[target.id].value =
        target.type === "file" ? target.files[0] : target.value;
    },
  },
};
</script>
