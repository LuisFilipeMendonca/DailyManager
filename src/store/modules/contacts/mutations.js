const mutations = {
  addContacts(state, payload) {
    console.log(payload);
    state.contactsList = payload;
  },
};

export default mutations;
