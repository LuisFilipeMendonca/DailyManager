import axios from "../../../util/axios";

const actions = {
  async getTodos({ commit, rootGetters }, payload) {
    try {
      const userId = rootGetters["auth/getUserId"];
      const dateTimestamps = payload.getTime();

      const response = await axios(`todos/${userId}/${dateTimestamps}`);

      commit("addTodos", response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async storeUpdateTask({ commit, rootGetters }, data) {
    try {
      let { formData, isEditing, taskId, atualDate } = data;
      let response;
      let taskDate = new Date(formData.date).getTime();

      if (isEditing) {
        response = await axios.put(`todos/${taskId}`, formData);
        if (atualDate !== taskDate) commit("deleteTask", response.data.id);
        else commit("updateTask", response.data);
      } else {
        const userId = rootGetters["auth/getUserId"];

        response = await axios.post("todos", { ...formData, userId });

        if (atualDate !== taskDate) return;

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
