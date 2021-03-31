import axios from "../../../util/axios";

const actions = {
  async getTodos({ commit }, payload) {
    try {
      const dateTimestamps = payload.getTime();

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
      let taskDate = new Date(
        new Date(formData.date).getFullYear(),
        new Date(formData.date).getMonth(),
        new Date(formData.date).getDate()
      ).getTime();

      if (isEditing) {
        response = await axios.put(`todos/${taskId}`, formData);
        if (atualDate !== taskDate) commit("deleteTask", response.data.id);
        else commit("updateTask", response.data);
      } else {
        response = await axios.post("todos", formData);

        if (atualDate !== taskDate) return;

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
