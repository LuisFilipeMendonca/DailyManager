import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const accountsModule = {
  namespaced: true,
  state() {
    return {
      account: {
        currentMonthTransactions: [],
      },
    };
  },
  getters,
  mutations,
  actions,
};

export default accountsModule;
