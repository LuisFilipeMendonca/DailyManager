const mutations = {
  login(state, payload) {
    state.userId = payload.id;
    state.userToken = payload.token;
    state.userEmail = payload.email;
    state.userName = payload.name;
    state.isLoggedIn = true;

    if (payload.isLogging) {
      localStorage.setItem("daily-manager", payload.token);
    }
  },
};

export default mutations;
