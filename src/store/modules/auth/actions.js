import axios from "../../../util/axios";

const actions = {
  async register(_, data) {
    try {
      await axios.post("/users", data);
    } catch (e) {
      throw e.response.data;
    }
  },
  async login({ commit }, data) {
    try {
      const response = await axios.post("/token", data);

      commit("login", { ...response.data, isLogging: true });
    } catch (e) {
      throw e.response.data;
    }
  },
};

export default actions;
