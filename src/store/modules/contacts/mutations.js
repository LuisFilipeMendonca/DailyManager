const mutations = {
  addContacts(state, payload) {
    state.contactsList = payload;
  },
  addContact(state, payload) {
    state.contactsList.push(payload);
  },
  deleteContact(state, payload) {
    const contactIdx = state.contactsList.findIndex(
      (contact) => contact.id === payload
    );

    state.contactsList.splice(contactIdx, 1);
  },
  updateContact(state, payload) {
    const contactIdx = state.contactsList.findIndex(
      (contact) => contact.id === payload.id
    );
    state.contactsList[contactIdx] = payload;
  },
};

export default mutations;
