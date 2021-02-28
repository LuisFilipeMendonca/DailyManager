<template>
  <base-form
    :submitHandler="submitHandler"
    :submitDescription="isEditing ? 'Edit Contact' : 'Add Contact'"
  >
    <template v-slot:form-header>
      <h2>{{ isEditing ? "Edit" : "Add" }} Contact</h2>
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
      <base-button :isLink="true" path="/contacts" type="button" mode="unstyled"
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
        contactPhoto: {
          type: "file",
          showValue: "",
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
      const formData = new Form(this.inputs).buildFormData("isEditing");
      this.$store.dispatch("contacts/storeUpdateContact", {
        formData,
        isEditing: this.isEditing,
        contactId: +this.$route.params.id,
      });
    },
    fileChangeHandler(target) {
      if (target.type === "file") {
        this.inputs[target.id].value = target.files[0];
        this.inputs[target.id].showValue = URL.createObjectURL(target.files[0]);
      } else {
        this.inputs[target.id].value = target.value;
      }
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
