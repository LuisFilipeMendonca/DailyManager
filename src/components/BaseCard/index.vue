<template>
  <div class="badge">
    <slot />
  </div>
</template>

<style scoped>
.badge {
  background-color: var(--primary-dark);
  border-radius: 3px;
  box-shadow: 0 0 5px var(--secondary);
}
</style>
