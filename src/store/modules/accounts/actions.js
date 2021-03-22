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
};

export default actions;
