import axios from "../../../util/axios";

const actions = {
  async getContacts({ commit }) {
    try {
      const response = await axios("contacts/1");

      commit("addContacts", response.data);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
