import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const contactModule = {
  namespaced: true,
  state() {
    return {
      contactsList: [],
    };
  },
  getters,
  actions,
  mutations,
};

export default contactModule;
