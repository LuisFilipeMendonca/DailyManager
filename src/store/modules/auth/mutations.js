const mutations = {
  login(state, payload) {
    state.userId = payload.id;
    state.userToken = payload.token;
    state.userEmail = payload.email;
    state.userName = payload.name;
    state.isLoggedIn = payload.isLoggedIn || true;

    if (!payload.isLoggedIn) {
      localStorage.setItem(
        "daily-manager",
        JSON.stringify({ ...payload, isLoggedIn: true })
      );
    }
  },
  getUserData() {
    const userData = JSON.parse(localStorage.getItem("daily-manager"));

    if (userData) {
      this.commit("auth/login", userData);
    }
  },
};

export default mutations;
