import axios from "../../../util/axios";

const actions = {
  async getAccountData({ commit }) {
    try {
      const date = new Date();
      const timestamps = date.getTime();

      const response = await axios(`/accounts/${timestamps}`);

      commit("getAccountData", response.data);
    } catch (e) {
      if (e.response.status === 401) {
        commit("auth/logout", [], { root: true });
      }
    }
  },
  async storeTransaction({ commit }, data) {
    try {
      console.log(data);
      const response = await axios.post("/accounts", data);

      console.log(response.data);
      console.log(commit);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
