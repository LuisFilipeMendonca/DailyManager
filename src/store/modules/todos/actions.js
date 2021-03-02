// import axios from '../../../util/axios';

import axios from "../../../util/axios";

const actions = {
  async getTodos({ commit, rootGetters }, payload) {
    try {
      const userId = rootGetters["auth/getUserId"];
      const dateTimestamps = payload.getTime();

      console.log(dateTimestamps);

      const response = await axios(`todos/${userId}/${dateTimestamps}`);

      commit("addTodos", response.data);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
