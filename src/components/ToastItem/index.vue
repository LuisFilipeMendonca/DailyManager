<template>
  <div class="toast__item" :class="toastTypeClass">
    <p class="toast__description">{{ description }}</p>
    <span
      class="toast__close"
      tabindex="1"
      @click="deleteToast"
      @keypress="deleteOnKeyPress"
    >
      <font-awesome-icon icon="times" />
    </span>
    <span
      :style="{
        width: `${width}%`,
        'transition-duration': `${toastDuration}ms`,
      }"
      class="toast__timer"
    ></span>
  </div>
</template>

<script>
export default {
  props: ["id", "description", "type"],
  emits: ["delete-toast"],
  data() {
    return {
      timer: null,
      width: 100,
      duration: 3000,
    };
  },
  methods: {
    deleteOnKeyPress(e) {
      if (e.type === "keypress" && e.keyCode !== 13) return;
      this.deleteToast();
    },
    deleteToast() {
      this.$emit("delete-toast", this.id);
    },
  },
  computed: {
    toastDuration() {
      return this.duration / 100;
    },
    toastTypeClass() {
      return `toast__item--${this.type}`;
    },
  },
  created() {
    this.timer = setInterval(() => {
      this.width--;

      if (this.width === 0) {
        clearInterval(this.timer);
        this.deleteToast();
      }
    }, this.toastDuration);
  },
};
</script>

<style scoped>
.toast__item {
  width: 100%;
  max-width: 300px;
  border-radius: 3px;
  padding: 16px 32px 16px 16px;
  color: var(--light);
  position: relative;
  pointer-events: all;
  overflow: hidden;
}

.toast__item:not(:last-of-type) {
  margin-bottom: 16px;
}

.toast__item--success {
  background: var(--success);
}

.toast__item--error {
  background: var(--error);
}

.toast__close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  padding: 2px 4px;
}

.toast__close:focus {
  outline: 1px dotted var(--light);
}

.toast__description {
  text-overflow: clip;
  line-height: 1.4rem;
}

.toast__timer {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 3px;
  background: #fff;
  transition: width linear;
}
</style>
