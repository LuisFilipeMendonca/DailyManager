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
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.8rem;
  position: relative;
  overflow: hidden;
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
  color: var(--primary-light);
  border: 1px solid var(--primary-light);
  background-color: transparent;
}

.secondary:hover {
  color: var(--primary-dark);
  background-color: var(--primary-light);
}

.secondary:focus {
  box-shadow: 0px 0px 10px var(--primary-light);
}

.secondary .loader__item {
  background-color: var(--primary-light);
}

.danger {
  color: rgb(255, 122, 122);
  border: 1px solid rgb(255, 122, 122);
  background-color: transparent;
}

.danger:hover {
  color: var(--primary-dark);
  background-color: rgb(255, 122, 122);
}

.danger:focus {
  box-shadow: 0px 0px 10px rgb(255, 122, 122);
}

.danger .loader__item {
  background-color: rgb(255, 122, 122);
}
</style>
