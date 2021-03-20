<template>
  <header class="header">
    <h1 class="header__title">Daily Manager</h1>
    <nav>
      <ul class="nav__menu" v-if="!isLogged">
        <li class="nav__item">
          <router-link to="/authentication">Authenticate</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLogged() {
      return this.$store.getters["auth/isLoggedIn"];
    },
  },
};
</script>

<style scoped>
.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid var(--secondary);
  background: var(--primary-dark);
  z-index: 10;
}

.header__title {
  color: var(--secondary);
}
</style>
