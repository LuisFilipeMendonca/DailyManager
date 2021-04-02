<template>
  <the-toaster />
  <the-header />
  <main class="main">
    <router-view />
  </main>
</template>

<script>
import TheHeader from "./layout/TheHeader";
import TheToaster from "./layout/TheToaster";

export default {
  components: {
    "the-header": TheHeader,
    "the-toaster": TheToaster,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  provide: {
    errorHandler(error, configErrorHandler) {
      switch (error.status) {
        case 400:
          configErrorHandler.inputs.setDBErrors(error.data, this.$store);
          break;
        case 401:
          this.$store.commit("auth/logout");
          this.$store.commit("toasts/addToast", {
            description: error.data.errorMsg,
            type: "error",
          });
          this.$router.push({
            name: configErrorHandler.redirect.name,
            query: configErrorHandler.redirect.query,
          });
          break;
        case 500:
          this.$store.commit("toasts/addToast", {
            description: error.data.errorMsg,
            type: "error",
          });
          this.$router.push("/");
      }
    },
  },
  async beforeCreate() {
    try {
      await this.$store.commit("auth/getUser");
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
  },
};
</script>

<style>
:root {
  --primary-dark: #303841;
  --primary-light: #3a4750;
  --secondary: #fbe384;
  --light: #eee;
  --success: #68cc77;
  --error: #ff7a7a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

html {
  font-size: 75%;
}

html,
body {
  height: 100%;
}

body {
  background-color: var(--primary-light);
  font-size: 1rem;
  font-family: "Montserrat";
}

body,
input,
::placeholder {
  color: var(--light);
}

::placeholder {
  opacity: 0.9;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

#app {
  height: 100%;
}

.main {
  height: 100%;
  padding: 60px 16px 0;
  max-width: 1000px;
  margin: 0 auto;
}

.section {
  padding: 8px 0;
}

@media screen and (min-width: 576px) {
  html {
    font-size: 80%;
  }

  .main {
    padding: 60px 16px 0;
  }

  .section {
    padding: 16px 0;
  }
}

@media screen and (min-width: 768px) {
  html {
    font-size: 90%;
  }
}

@media screen and (min-width: 992px) {
  html {
    font-size: 100%;
  }
}
</style>
