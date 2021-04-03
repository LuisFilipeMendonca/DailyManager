import Dates from "../../../helpers/Dates";
import axios from "../../../util/axios";

const actions = {
  async getTodos({ commit }, payload) {
    try {
      const dateTimestamps = payload.getTimestampsWithoutTime();

      console.log(payload);

      const response = await axios(`todos/${dateTimestamps}`);

      commit("addTodos", response.data);
    } catch (e) {
      throw e.response;
    }
  },
  async storeUpdateTask({ commit }, data) {
    try {
      const { formData, isEditing, taskId, atualDate } = data;
      let response;
      let taskDateTimestamps = new Dates(
        formData.date
      ).getTimestampsWithoutTime();
      const atualDateTimestamps = new Dates(
        atualDate
      ).getTimestampsWithoutTime();

      if (isEditing) {
        response = await axios.put(`todos/${taskId}`, formData);
        if (Dates.isSameTimestamps(taskDateTimestamps, atualDateTimestamps))
          commit("deleteTask", response.data.id);
        else commit("updateTask", response.data);
      } else {
        response = await axios.post("todos", formData);

        if (!Dates.isSameTimestamps(taskDateTimestamps, atualDateTimestamps))
          return;

        commit("addTask", response.data);
      }
    } catch (e) {
      throw e.response;
    }
  },
  async deleteTask({ commit }, taskId) {
    try {
      await axios.delete(`todos/${taskId}`);

      commit("deleteTask", taskId);
    } catch (e) {
      throw e.response;
    }
  },
};

export default actions;
