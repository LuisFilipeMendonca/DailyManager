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
  async storeUpdateTask({ commit, rootGetters }, data) {
    try {
      let { formData, isEditing, taskId } = data;
      let response;

      if (isEditing) {
        response = await axios.put(`todos/${taskId}`, formData);

        commit("updateTask", response.data);
      } else {
        const userId = rootGetters["auth/getUserId"];
        formData = { ...formData, userId };
        response = await axios.post("todos", formData);

        commit("addTask", response.data);
      }
    } catch (e) {
      console.log(e);
    }
  },
  async deleteTask({ commit }, taskId) {
    try {
      await axios.delete(`todos/${taskId}`);

      commit("deleteTask", taskId);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
