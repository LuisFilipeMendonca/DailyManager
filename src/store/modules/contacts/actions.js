import axios from "../../../util/axios";

const actions = {
  async getContacts({ commit, rootGetters }) {
    try {
      const userId = rootGetters["auth/getUserId"];
      const response = await axios(`contacts/${userId}`);

      commit("addContacts", response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async storeUpdateContact({ commit }, data) {
    try {
      const { formData, isEditing, contactId } = data;
      let response;

      console.log(isEditing);

      if (isEditing) {
        response = await axios.put(`contacts/${contactId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        commit("updateContact", response.data);
      } else {
        response = await axios.post("contacts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        commit("addContact", response.data);
      }
    } catch (e) {
      console.log(e);
    }
  },
  async deleteContact({ commit }, contactId) {
    try {
      await axios.delete(`contacts/${contactId}`);

      commit("deleteContact", contactId);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
