import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const chronometerModule = {
  namespaced: true,
  state() {
    return {
      chronometers: [],
    };
  },
  getters,
  mutations,
  actions,
};

export default chronometerModule;
