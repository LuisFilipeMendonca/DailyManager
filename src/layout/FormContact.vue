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
      <base-button :isLink="true" path="/contacts" type="button" mode="unstyled"
        >Cancel</base-button
      >
    </template>
  </base-form>
</template>

<script>
import Form from "../helpers/Form";
import Inputs from "../helpers/Inputs";
import { contactsInputs } from "../constants/inputs";

export default {
  data() {
    return {
      inputsData: new Inputs(contactsInputs),
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
    inputs() {
      return this.inputsData.inputs;
    },
  },
  methods: {
    submitHandler() {
      const form = new Form(this.inputsData);

      if (!form.isValid()) return;
      // this.$store.dispatch("contacts/storeUpdateContact", {
      //   formData,
      //   isEditing: this.isEditing,
      //   contactId: +this.$route.params.id,
      // });
    },
    changeHandler(target) {
      this.inputsData.changeHandler(target);
    },
    focusHandler(target) {
      this.inputsData.focusHandler(target);
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
