<template>
  <base-card>
    <router-link :to="path" class="link">
      <div class="link__content">
        <span class="link__icon"><font-awesome-icon :icon="icon"/></span>
        <span class="link__description">{{ description }}</span>
      </div>
    </router-link>
  </base-card>
</template>

<script>
export default {
  props: ["path", "icon", "description"],
};
</script>

<style scoped>
.link {
  display: block;
  width: 150px;
  height: 150px;
}

.link__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #d1d1d0;
  position: relative;
}

.link__icon {
  font-size: 3rem;
  transition: transform 0.3s linear;
}

.link:hover .link__icon {
  transform: translateY(-16px);
}

.link__description {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 0;
  transition: all 0.3s linear;
}

.link:hover .link__description {
  transform: translate(-50%, 16px);
  opacity: 1;
}
</style>
