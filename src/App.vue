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
</style>
