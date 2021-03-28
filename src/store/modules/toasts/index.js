import mutations from "./mutations";
import getters from "./getters";

const toastsModule = {
  namespaced: true,
  state() {
    return {
      toasts: [],
    };
  },
  mutations,
  getters,
};

export default toastsModule;
