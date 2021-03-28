<template>
  <div class="toast__item" :class="toastTypeClass">
    <p class="toast__description">{{ description }}</p>
    <font-awesome-icon icon="times" class="toast__close" />
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
  data() {
    return {
      timer: null,
      width: 100,
      duration: 10000,
    };
  },
  computed: {
    toastDuration() {
      console.log("ola");
      return this.duration / 100;
    },
    toastTypeClass() {
      return `toast__item--${this.type}`;
    },
  },
  created() {
    this.timer = setInterval(() => {
      this.width--;

      console.log(this.width);
      if (this.width === 0) {
        clearInterval(this.timer);
      }
    }, this.toastDuration);
  },
};
</script>

<style scoped>
.toast__item {
  margin-top: 16px;
  margin-right: 16px;
  width: 300px;
  border-radius: 3px;
  padding: 16px 24px 16px 16px;
  color: var(--primary-dark);
  position: relative;
  pointer-events: all;
  overflow: hidden;
}

.toast__item--success {
  background: lightgreen;
}

.toast__item--error {
  background: rgb(255, 122, 122);
}

.toast__close {
  position: absolute;
  top: 8px;
  right: 8px;
}

.toast__description {
  text-overflow: clip;
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
