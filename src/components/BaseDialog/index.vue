<template>
  <teleport to="body">
    <transition name="backdrop">
      <div v-if="isOpen" class="backdrop" @click="closeDialog"></div>
    </transition>
    <transition name="dialog">
      <dialog open v-if="isOpen" class="dialog">
        <header class="">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <slot></slot>
        <slot name="actions"></slot>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: ["isOpen", "title"],
  emits: ["close"],
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.4);
  z-index: 20;
}

.dialog {
  position: fixed;
  top: 20px;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  border: none;
  border-radius: 3px;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: translate(-50%, -100px);
}

.dialog-enter-active {
  transition: all 0.5s ease-out 0.2s;
}

.dialog-leave-active {
  transition: all 0.5s ease-out;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: translate(-50%, 0px);
}

.backdrop-enter-to,
.backdrop-leave-from {
  opacity: 1;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: all 0.5s ease-out;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
