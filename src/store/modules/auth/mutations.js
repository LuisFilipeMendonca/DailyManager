import axios from "../../../util/axios";

const mutations = {
  login(state, payload) {
    state.userId = payload.id || null;
    state.userToken = payload.token || null;
    state.userEmail = payload.email || null;
    state.userName = payload.name || null;
    state.isLoggedIn = true;

    axios.defaults.headers.Authorization = `Bearer ${payload.token}`;

    if (payload.isLogging) {
      localStorage.setItem("daily-manager", JSON.stringify(payload));
    }
  },
  getUser() {
    const userData = JSON.parse(localStorage.getItem("daily-manager"));

    if (!userData) return;

    this.commit("auth/login", userData);
  },
  logout(state) {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("daily-manager");

    state.userId = null;
    state.userToken = null;
    state.userEmail = null;
    state.userName = null;
    state.isLoggedIn = false;
  },
};

export default mutations;
