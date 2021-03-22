import axios from "../../../util/axios";

const actions = {
  async register(_, data) {
    try {
      console.log(data);
      await axios.post("/users", data);
    } catch (e) {
      console.log(e);
    }
  },
  async login({ commit }, data) {
    try {
      const response = await axios.post("/token", data);

      axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      commit("login", { ...response.data, isLogging: true });
    } catch (e) {
      console.log(e);
    }
  },
  async getUser({ commit }, token) {
    try {
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      const response = await axios.get("/users");

      commit("login", { ...response.data, token });
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
