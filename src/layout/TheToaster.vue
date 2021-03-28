<template>
  <div class="toast">
    <toast-item
      v-for="toast in toasts"
      :key="toast.id"
      :description="toast.description"
      :type="toast.type"
    />
  </div>
</template>

<script>
import ToastItem from "../components/ToastItem";

export default {
  components: {
    "toast-item": ToastItem,
  },
  data() {
    return {
      toasts: [
        {
          id: 1,
          description: "Something went wrong. Try again later.",
          type: "error",
        },
        { id: 2, description: "Added successfully", type: "success" },
      ],
    };
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
  /* background-color: rgba(255, 255, 255, 0.2); */
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
