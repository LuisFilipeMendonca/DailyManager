import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const authModule = {
  namespaced: true,
  state() {
    return {
      userId: null,
      userToken: null,
      userEmail: null,
      userName: null,
      isLoggedIn: false,
    };
  },
  getters,
  actions,
  mutations,
};

export default authModule;
