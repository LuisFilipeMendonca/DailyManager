import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const todosModule = {
  namespaced: true,
  state() {
    return {
      todosList: [],
    };
  },
  getters,
  actions,
  mutations,
};

export default todosModule;
