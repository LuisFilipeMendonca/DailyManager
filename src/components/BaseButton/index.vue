<template>
  <button
    v-if="!isLink"
    :class="['btn', mode]"
    :type="type"
    @click="clickHandler"
  >
    <slot />
  </button>
  <router-link v-else :to="path" :class="['btn', mode]">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: ["mode", "isLink", "path", "type", "clickHandler"],
};
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  border-radius: 3px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  font-size: 0.8rem;
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
  color: #d1d1d0;
  background-color: #454544;
  border: 1px solid #454544;
}

.unstyled:hover,
.unstyled:focus,
.unstyled:active {
  background-color: transparent;
}

.flatten {
  color: #454544;
  background-color: #d1d1d0;
  border: 1px solid #d1d1d0;
}

.flatten:hover,
.flatten:focus,
.flatten:active {
  color: #d1d1d0;
  background-color: transparent;
}
</style>
