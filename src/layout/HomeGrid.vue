<template>
  <nav class="grid">
    <nav-item
      class="badge"
      v-for="link in links"
      :key="link.description"
      :path="link.path"
      :icon="link.icon"
      :description="link.description"
    />
  </nav>
</template>

<script>
import mainNavigation from "../constants/mainNavigation";
import NavItem from "../components/NavItem";

export default {
  components: {
    "nav-item": NavItem,
  },
  data() {
    return {
      links: mainNavigation,
    };
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 64px;
}
</style>
