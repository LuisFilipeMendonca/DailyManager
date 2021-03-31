<template>
  <section class="section">
    <base-form
      :submitHandler="submitHandler"
      :submitDescription="isEditing ? 'Edit Contact' : 'Add Contact'"
      :isBtnLoading="isLoading"
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
        <base-button :isLink="true" path="/contacts" type="button" mode="danger"
          >Cancel</base-button
        >
      </template>
    </base-form>
  </section>
</template>

<script>
import Form from "../helpers/Form";
import Inputs from "../helpers/Inputs";
import { contactsInputs } from "../constants/inputs";

export default {
  inject: ["errorHandler"],
  data() {
    return {
      inputsData: new Inputs(contactsInputs),
      isLoading: false,
    };
  },
  created() {
    this.inputsData.clearValues();
    this.getContact();
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

      this.getContact();
    },
  },
  methods: {
    async submitHandler() {
      const form = new Form(this.inputsData);

      if (!form.isValid(this.$store)) return;
      this.isLoading = true;
      try {
        const formData = form.buildFormData(this.isEditing);

        await this.$store.dispatch("contacts/storeUpdateContact", {
          formData,
          isEditing: this.isEditing,
          contactId: +this.$route.params.id,
        });

        this.isLoading = false;
        this.$router.replace("/contacts");
        this.$store.commit("toasts/addToast", {
          description: "Your contact was successfully added",
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

      if (target.type === "file") {
        const inputIdx = this.inputsData.getInputIdx(target.id);

        if (
          !this.inputsData.inputs[inputIdx].validator(
            this.inputsData.inputs[inputIdx]
          )
        ) {
          this.inputsData.isInvalidHandler(target);
          this.inputsData.inputs[inputIdx].value = "";
        } else {
          this.inputsData.focusHandler(target);
        }
      }
    },
    focusHandler(target) {
      this.inputsData.focusHandler(target);
    },
    getContact() {
      const contactId = +this.$route.params.id;

      if (!contactId) return;

      const contactData = this.$store.getters["contacts/getContact"](contactId);

      if (!contactData) {
        this.$router.replace("/contacts");
        return;
      }

      this.inputsData.setInputsData(contactData);
    },
  },
};
</script>
