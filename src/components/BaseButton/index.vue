<template>
  <button
    v-if="!isLink"
    :class="['btn', mode, btnLoading]"
    :type="type"
    @click="clickHandler"
  >
    <p class="btn__description"><slot /></p>
    <base-loader :show="!!btnLoading" />
  </button>
  <router-link v-else :to="path" :class="['btn', mode]">
    <slot />
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
  transition: all 0.3s ease-in;
  cursor: pointer;
  font-size: 0.8rem;
  position: relative;
  overflow: hidden;
}

.btn.loading .btn__description {
  transform: translate(0, -200%);
}

.loader__item {
  background-color: var(--primary-dark);
}

.outline {
  border: 1px solid #d1d1d0;
  color: #d1d1d0;
  background-color: transparent;
}

.outline:hover,
.outline:focus,
.outline:active {
  background-color: #5c5c5b;
}

.unstyled {
  color: var(--primary-light);
  background-color: transparent;
  border: 1px solid var(--primary-light);
}

.unstyled:hover,
.unstyled:focus,
.unstyled:active {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}

.flatten {
  color: var(--secondary);
  border: 1px solid var(--secondary);
  background-color: transparent;
}

.flatten:hover,
.flatten:focus,
.flatten:active {
  color: var(--primary-dark);
  background-color: var(--secondary);
}
</style>
