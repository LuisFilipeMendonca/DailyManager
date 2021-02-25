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
  background-color: #454544;
  color: #d1d1d0;
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
