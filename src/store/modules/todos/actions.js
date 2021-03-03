import axios from "../../../util/axios";

import { timeWithoutSec } from "../../../util/dates";

const actions = {
  async getTodos({ commit, rootGetters }, payload) {
    try {
      const userId = rootGetters["auth/getUserId"];
      const dateTimestamps = payload.getTime();

      const response = await axios(`todos/${userId}/${dateTimestamps}`);

      const transformedData = [];

      response.data.forEach((todo) => {
        const newTodo = {
          ...todo,
          time: timeWithoutSec(todo.time),
        };

        transformedData.push(newTodo);
      });

      commit("addTodos", transformedData);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
