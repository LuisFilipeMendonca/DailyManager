<template>
  <section class="section">
    <h1 class="main__title">Your life.. One App!</h1>
    <h2 class="main__subtitle" v-if="!getUserName">
      Trying to organize your life but seems impossible? Don't waste more time
      and register in our app.
    </h2>
    <h2 class="main__subtitle" v-else>Welcome, {{ getUserName }}</h2>
    <base-button
      :isLink="true"
      mode="primary"
      path="/authentication"
      v-if="!isLoggedIn"
      >Authenticate</base-button
    >
    <home-grid v-else></home-grid>
  </section>
</template>

<script>
import HomeGrid from "../layout/HomeGrid";

export default {
  components: {
    "home-grid": HomeGrid,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    getUserName() {
      return this.$store.getters["auth/getUserName"];
    },
  },
};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 24px 0;
}
.main__title {
  font-size: 2rem;
  font-weight: 700;
  padding: 8px;
  border-bottom: 1px solid var(--secondary);
  color: var(--secondary);
}

.main__subtitle {
  font-size: 1.3rem;
}

.main__title,
.main__subtitle {
  margin-bottom: 32px;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .main__title {
    padding: 8px 16px;
  }

  .main__subtitle {
    padding: 0 32px;
  }

  .main__title,
  .main__subtitle {
    margin-bottom: 40px;
  }
}
</style>
