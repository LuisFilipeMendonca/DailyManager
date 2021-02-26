<template>
  <base-form :submitHandler="submitHandler" submitDescription="Add Contact">
    <template v-slot:form-header>
      <h2>Add Contact</h2>
    </template>
    <template v-slot:form-inputs>
      <div class="input-group">
        <input
          class="input-group__input"
          type="text"
          placeholder="Contact name"
          id="name"
        />
        <label class="input-group__label" for="name">Name</label>
      </div>
      <div class="input-group">
        <input
          class="input-group__input"
          type="tel"
          placeholder="Contact phone"
          id="phone"
        />
        <label class="input-group__label" for="phone">Phone</label>
      </div>
      <div class="input-group">
        <input
          class="input-group__input"
          type="email"
          placeholder="Contact Email"
          id="email"
        />
        <label class="input-group__label" for="email">Email</label>
      </div>
      <div class="input-group">
        <input
          class="input-group__input"
          type="text"
          placeholder="Contact Address"
          id="address"
        />
        <label class="input-group__label" for="address">Address</label>
      </div>
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
  created() {
    console.log(this.$route.params.id);
  },
  methods: {
    submitHandler() {
      console.log("submited");
    },
  },
};
</script>

<style scoped>
.input-group {
  position: relative;
  margin-bottom: 40px;
}

.input-group__input {
  display: block;
  width: 100%;
  background-color: #454544;
  padding: 8px 16px;
  border-radius: 3px;
  color: #d1d1d0;
  border: 1px solid transparent;
  z-index: 1;
}

.input-group__input:focus {
  border-color: #d1d1d0;
}

.input-group__label {
  position: absolute;
  top: 0;
  left: 4px;
  opacity: 0;
  transform: translateY(0);
  transition: 0.2s ease-in;
  transition-property: opacity, transform;
}

.input-group__input:focus + .input-group__label,
.input-group__input:not(:placeholder-shown) + .input-group__label {
  opacity: 1;
  transform: translateY(-24px);
}
</style>
