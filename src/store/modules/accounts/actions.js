import axios from "../../../util/axios";

const actions = {
  async getAccountData({ commit }) {
    try {
      const date = new Date();
      const timestamps = date.getTime();

      const response = await axios(`/accounts/${timestamps}`);

      commit("getAccountData", response.data);
    } catch (e) {
      throw e.response;
    }
  },
  async storeTransaction({ commit }, data) {
    try {
      const currentYear = new Date().getFullYear();
      const response = await axios.post("/accounts", data);

      if (currentYear === +data.transactionDate.slice(0, 4)) {
        commit("addTransaction", response.data);
      }
    } catch (e) {
      throw e.response;
    }
  },
};

export default actions;
