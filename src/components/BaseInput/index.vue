<template>
  <div class="input" v-if="type === 'file'">
    <input
      class="input__elem--file"
      :type="type"
      :placeholder="placeholder"
      :id="id"
      @change="changeHandler"
    />
    <label
      class="input__label--file"
      :class="{ 'input__label--invalid': !isValid }"
      :for="id"
    >
      <img
        v-if="value"
        :src="filePreview"
        alt="contact photo"
        class="input__photo"
      />
      <span class="input__icon">
        <font-awesome-icon icon="plus-circle" />
      </span>
    </label>
  </div>
  <div class="input input--radio" v-else-if="type === 'radio'">
    <span class="radio__label">{{ label }}</span>
    <div class="radio__container">
      <label
        class="input__label--radio"
        v-for="option in options"
        :key="option.value"
        :for="option.value"
      >
        <input
          class="input__elem--radio"
          type="radio"
          :id="option.value"
          :name="id"
          :checked="option.checked"
          :value="option.value"
          @input="changeHandler"
        />
        <span class="radio__checkmark"></span>
        {{ option.description }}
      </label>
    </div>
  </div>
  <div v-else class="input" :class="classValue">
    <input
      class="input__elem"
      :class="{ 'input__elem--invalid': !isValid }"
      :type="type"
      :placeholder="placeholder"
      :id="id"
      :value="value"
      :disabled="disabled"
      @input="changeHandler"
      @focus="focusHandler"
    />
    <label v-if="!noLabel" class="input__label" :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "type",
    "label",
    "placeholder",
    "value",
    "classValue",
    "noLabel",
    "disabled",
    "isValid",
    "options",
  ],
  emits: ["change-handler", "focus-handler"],
  methods: {
    changeHandler(e) {
      this.$emit("change-handler", e.target);
    },
    focusHandler(e) {
      this.$emit("focus-handler", e.target);
    },
  },
  computed: {
    filePreview() {
      if (typeof this.value === "string") {
        return this.value;
      }
      return URL.createObjectURL(this.value);
    },
  },
};
</script>

<style scoped>
.input {
  position: relative;
  margin-bottom: 40px;
}

.input--radio {
  margin-top: -20px;
}

.input__elem {
  display: block;
  width: 100%;
  background-color: var(--bg);
  padding: 8px 16px;
  border-radius: 3px;
  color: var(--primary-light);
  border: 1px solid transparent;
  z-index: 1;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  filter: none;
  background-color: var(--bg) !important;
}

.input__elem:focus {
  border-color: var(--secondary);
}

.input__elem--invalid {
  border-color: red;
}

.input__label {
  text-transform: capitalize;
  position: absolute;
  top: 0;
  left: 4px;
  opacity: 0;
  transform: translateY(0);
  transition: 0.2s ease-in;
  transition-property: opacity, transform;
  color: var(--secondary);
}

.input__elem:focus + .input__label,
.input__elem:not(:placeholder-shown) + .input__label {
  opacity: 1;
  transform: translateY(-24px);
}

.input__elem--file {
  display: none;
}

.input__label--file {
  display: block;
  width: 125px;
  height: 125px;
  border: 1px dashed var(--secondary);
  border-radius: 50%;
  margin: 0 auto;
  background-color: var(--bg);
  position: relative;
}

.input__label--invalid {
  border-color: red;
}

.input__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.input__icon {
  position: absolute;
  bottom: 0;
  right: 20px;
  color: var(--secondary);
}

.radio__container {
  background-color: var(--bg);
  border-radius: 3px;
  padding: 8px 16px;
}

.radio__container > *:not(:last-child) {
  margin-bottom: 8px;
}

.radio__label {
  color: var(--secondary);
  margin-bottom: 8px;
  display: block;
}

.input__label--radio {
  display: flex;
  align-items: center;
}

.input__elem--radio {
  display: none;
}

.input__elem--radio:checked + .radio__checkmark:before {
  display: block;
}

.radio__checkmark {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 1px solid var(--secondary);
  margin-right: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio__checkmark:before {
  position: absolute;
  content: "";
  width: 7.5px;
  height: 7.5px;
  background-color: var(--secondary);
  border-radius: 50%;
  display: none;
}

.mb-none {
  margin-bottom: 0;
}
</style>
