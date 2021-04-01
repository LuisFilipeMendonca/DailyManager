<template>
  <header class="header">
    <router-link to="/"
      ><h1 class="header__title">Daily Manager</h1></router-link
    >
    <nav>
      <ul class="nav__menu">
        <li class="nav__item" v-if="isLogged">
          <base-button type="button" mode="primary" :clickHandler="logout"
            >Logout</base-button
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLogged() {
      console.log(this.$store.getters["auth/isLoggedIn"]);
      return this.$store.getters["auth/isLoggedIn"];
    },
  },
  methods: {
    logout() {
      this.$store.commit("auth/logout");
      this.$router.replace("/");
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
