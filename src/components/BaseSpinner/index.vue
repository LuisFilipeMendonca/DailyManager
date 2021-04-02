<template>
  <div class="spinner">
    <span class="spinner__item"></span>
    <span class="spinner__item"></span>
    <span class="spinner__item"></span>
    <span class="spinner__item"></span>
    <span class="spinner__item"></span>
    <span class="spinner__item"></span>
    <span class="spinner__item"></span>
    <span class="spinner__item"></span>
  </div>
</template>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
}

.spinner__item {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  transform: rotate(45deg);
  animation: rotate 1.5s cubic-bezier(1, 0, 0.58, 0.69) infinite;
}

.spinner__item:nth-child(1) {
  animation-delay: -0.075s;
}

.spinner__item:nth-child(2) {
  animation-delay: -0.144s;
}

.spinner__item:nth-child(3) {
  animation-delay: -0.216s;
}

.spinner__item:nth-child(4) {
  animation-delay: -0.288s;
}

.spinner__item:nth-child(5) {
  animation-delay: -0.36s;
}

.spinner__item:nth-child(6) {
  animation-delay: -0.432s;
}

.spinner__item:nth-child(7) {
  animation-delay: -0.504s;
}

.spinner__item:nth-child(8) {
  animation-delay: -0.576s;
}

.spinner__item:before {
  content: "";
  position: absolute;
  display: block;
  background-color: var(--light);
  height: 7px;
  width: 7px;
  border-radius: 50%;
}
</style>
