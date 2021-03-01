<template>
  <the-header />
  <main class="main">
    <router-view />
  </main>
</template>

<script>
import TheHeader from "./layout/TheHeader";

export default {
  components: {
    "the-header": TheHeader,
  },
  data() {
    return {
      isLogged: false,
    };
  },
};
</script>

<style>
:root {
  --bg: #3a4750;
  --primary-dark: #303841;
  --primary-light: #eee;
  --secondary: #fbe384;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

html,
body {
  height: 100%;
}

body {
  background-color: var(--bg);
  color: var(--primary-light);
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

input {
  border: none;
  background: transparent;
}

#app {
  height: 100%;
}

.main {
  height: 100%;
  padding: 60px 16px 16px;
}
</style>
