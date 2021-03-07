import axios from "../../../util/axios";

const actions = {
  async getChronometers({ commit, rootGetters }) {
    try {
      const userId = rootGetters["auth/getUserId"];

      const response = await axios(`/chronometers/${userId}`);

      commit("addChronometers", response.data);
    } catch (e) {
      console.log(e);
    }
  },

  async storeUpdateChronometer({ commit, rootGetters }, data) {
    try {
      const userId = rootGetters["auth/getUserId"];
      let { chronometerData, isUpdating, id } = data;
      let response;

      chronometerData = { ...chronometerData, userId };

      if (isUpdating) {
        response = await axios.put(`/chronometers/${id}`, chronometerData);
        commit("updateChronometer", response.data);
      } else {
        response = await axios.post("/chronometers", chronometerData);
        commit("addChronometer", response.data);
      }
    } catch (e) {
      console.log(e);
    }
  },

  async deleteChronometer({ commit }, id) {
    try {
      await axios.delete(`/chronometers/${id}`);

      commit("deleteChronometer", id);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
