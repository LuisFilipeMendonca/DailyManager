import Dates from "../../../helpers/Dates";
import axios from "../../../util/axios";

const actions = {
  async getAccountData({ commit }) {
    try {
      const timestamps = new Dates().getTimestampsWithoutTime();

      const response = await axios(`/accounts/${timestamps}`);

      commit("getAccountData", response.data);
    } catch (e) {
      throw e.response;
    }
  },
  async storeTransaction({ commit }, data) {
    try {
      const currentYear = new Dates().getYear();
      const response = await axios.post("/accounts", data);

      if (Dates.isSameYear(currentYear, data.transactionDate.slice(0, 4))) {
        commit("addTransaction", response.data);
      }
    } catch (e) {
      throw e.response;
    }
  },
};

export default actions;
