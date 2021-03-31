import axios from "../../../util/axios";

const actions = {
  async getContacts({ commit }) {
    try {
      const response = await axios("/contacts");

      commit("addContacts", response.data);
    } catch (e) {
      throw e.response;
    }
  },
  async storeUpdateContact({ commit }, data) {
    try {
      const { formData, isEditing, contactId } = data;
      let response;

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
      throw e.response;
    }
  },
  async deleteContact({ commit }, contactId) {
    try {
      await axios.delete(`contacts/${contactId}`);

      commit("deleteContact", contactId);
    } catch (e) {
      throw e.response;
    }
  },
};

export default actions;
