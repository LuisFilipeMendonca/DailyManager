<template>
  <div class="input" v-if="type === 'file'">
    <input
      class="input__elem--file"
      :type="type"
      :placeholder="placeholder"
      :id="id"
      @change="fileChangeHandler"
    />
    <label class="input__label--file" :for="id">
      <img v-if="value" :src="value" alt="contact photo" class="input__photo" />
      <span class="input__icon">
        <font-awesome-icon icon="plus-circle" />
      </span>
    </label>
  </div>
  <div v-else class="input">
    <input
      class="input__elem"
      :type="type"
      :placeholder="placeholder"
      :id="id"
      :value="value"
      @change="fileChangeHandler"
    />
    <label class="input__label" :for="id">{{ id }}</label>
  </div>
</template>

<script>
export default {
  props: ["id", "type", "placeholder", "value"],
  emits: ["file-change-handler"],
  methods: {
    fileChangeHandler(e) {
      this.$emit("file-change-handler", e.target);
    },
  },
};
</script>

<style scoped>
.input {
  position: relative;
  margin-bottom: 40px;
}

.input__elem {
  display: block;
  width: 100%;
  background-color: #454544;
  padding: 8px 16px;
  border-radius: 3px;
  color: #d1d1d0;
  border: 1px solid transparent;
  z-index: 1;
}

.input__elem:focus {
  border-color: #d1d1d0;
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
  border: 1px dashed #d1d1d0;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #454544;
  position: relative;
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
}
</style>
