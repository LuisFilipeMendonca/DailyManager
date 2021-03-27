<template>
  <div class="loader" :class="{ 'loader--show': show }">
    <span class="loader__item"></span>
    <span class="loader__item"></span>
    <span class="loader__item"></span>
  </div>
</template>

<script>
export default {
  props: ["show"],
};
</script>

<style scoped>
.loader {
  position: absolute;
  top: 120%;
}

.loader--show {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}

.loader__item {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.loader--show .loader__item {
  animation: bounce 0.9s ease infinite;
}

.loader__item:nth-child(1) {
  animation-delay: 0;
}

.loader__item:nth-child(2) {
  animation-delay: 0.3s;
}

.loader__item:nth-child(3) {
  animation-delay: 0.6s;
}

.loader__item:not(:last-of-type) {
  margin-right: 4px;
}
</style>
