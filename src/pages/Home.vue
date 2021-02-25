<template>
  <section class="section">
    <h1 class="main__title">Your life.. One App!</h1>
    <h2 class="main__subtitle">
      Trying to organize your life but seems impossible? Don't waste more time
      and register in our app.
    </h2>
    <home-grid></home-grid>
  </section>
</template>

<script>
import HomeGrid from "../layout/HomeGrid";

export default {
  components: {
    "home-grid": HomeGrid,
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
  font-size: 2.5rem;
  padding: 8px;
  border-bottom: 1px solid #d1d1d0;
  margin-bottom: 32px;
}

.main__subtitle {
  font-size: 1.5rem;
  line-height: 32px;
  text-align: center;
}
</style>
