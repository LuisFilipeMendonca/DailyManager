<template>
  <the-header />
  <main class="main">
    <h1 class="main__title">Your life.. One App!</h1>
    <h2 class="main__subtitle">
      Trying to organize your life but seems impossible? Don't waste more time
      and register in our app.
    </h2>
    <home-grid></home-grid>
  </main>
</template>

<script>
import TheHeader from "./layout/TheHeader";
import HomeGrid from "./layout/HomeGrid";

export default {
  components: {
    "the-header": TheHeader,
    "home-grid": HomeGrid,
  },
  data() {
    return {
      isLogged: false,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  background-color: #454544;
  color: #d1d1d0;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

#app {
  height: 100%;
}

.main {
  min-height: calc(100% - 60px);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
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
}
</style>
