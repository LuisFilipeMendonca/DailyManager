import axios from "../../../util/axios";

const actions = {
  async getChronometers({ commit }) {
    try {
      const response = await axios("/chronometers");

      commit("addChronometers", response.data);
    } catch (e) {
      throw e.response;
    }
  },

  async storeUpdateChronometer({ commit }, data) {
    try {
      const { chronometerData, isUpdating, id } = data;
      let response;

      if (isUpdating) {
        response = await axios.put(`/chronometers/${id}`, chronometerData);
        commit("updateChronometer", response.data);
      } else {
        response = await axios.post("/chronometers", chronometerData);
        commit("addChronometer", response.data);
      }
    } catch (e) {
      throw e.response;
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
