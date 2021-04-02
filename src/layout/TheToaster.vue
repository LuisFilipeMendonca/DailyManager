<template>
  <div class="toast">
    <transition-group name="toast-anim">
      <toast-item
        v-for="toast in toasts"
        :key="toast.id"
        :id="toast.id"
        :description="toast.description"
        :type="toast.type"
        @delete-toast="deleteToast"
      />
    </transition-group>
  </div>
</template>

<script>
import ToastItem from "../components/ToastItem";

export default {
  components: {
    "toast-item": ToastItem,
  },
  computed: {
    toasts() {
      const toasts = this.$store.getters["toasts/getToasts"];
      return toasts;
    },
  },
  methods: {
    deleteToast(id) {
      this.$store.commit("toasts/deleteToast", id);
    },
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 16px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: hidden;
}

@keyframes slideOut {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-30px);
    opacity: 1;
  }
  100% {
    transform: translateX(30px);
    opacity: 0;
  }
}

@keyframes slideIn {
  0% {
    transform: translateX(30px);
    opacity: 0;
  }
  50% {
    transform: translateX(-30px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-anim-enter-active {
  animation: slideIn 0.5s ease;
}

.toast-anim-leave-active {
  animation: slideOut 0.5s ease;
}

.toast-anim-enter {
  transform: translateX(-30px);
}

.toast-anim-enter-to {
  transform: translateX(0);
}
</style>
