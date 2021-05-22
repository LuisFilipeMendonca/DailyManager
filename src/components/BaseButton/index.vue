<template>
  <button
    v-if="!isLink"
    :class="['btn', mode, btnLoading]"
    :type="type"
    @click="clickHandler"
  >
    <span class="btn__description"><slot /></span>
    <base-loader :show="!!btnLoading" />
  </button>
  <router-link v-else :to="path" :class="['btn', mode]">
    <span class="btn__description"><slot /></span>
  </router-link>
</template>

<script>
export default {
  props: ["mode", "isLink", "path", "type", "clickHandler", "isLoading"],
  computed: {
    btnLoading() {
      return this.isLoading ? "loading" : null;
    },
  },
};
</script>

<style>
.btn {
  padding: 8px 16px;
  border-radius: 3px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.8rem;
  position: relative;
  overflow: hidden;
}

.btn__description {
  display: inline-block;
}

.btn.loading .btn__description {
  transform: translate(0, -200%);
}

.primary {
  color: var(--secondary);
  border: 1px solid var(--secondary);
  background-color: transparent;
}

.primary:hover {
  color: var(--primary-dark);
  background-color: var(--secondary);
}

.primary:focus {
  box-shadow: 0px 0px 10px var(--secondary);
}

.primary .loader__item {
  background-color: var(--secondary);
}

.secondary {
  color: var(--light);
  border: 1px solid var(--light);
  background-color: transparent;
}

.secondary:hover {
  color: var(--primary-dark);
  background-color: var(--light);
}

.secondary:focus {
  box-shadow: 0px 0px 10px var(--light);
}

.secondary .loader__item {
  background-color: var(--light);
}

.danger {
  color: var(--error);
  border: 1px solid var(--error);
  background-color: transparent;
}

.danger:hover {
  color: var(--primary-dark);
  background-color: var(--error);
}

.danger:focus {
  box-shadow: 0px 0px 10px var(--error);
}

.danger .loader__item {
  background-color: var(--error);
}
</style>
