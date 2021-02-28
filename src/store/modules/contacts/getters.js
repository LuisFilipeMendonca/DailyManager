const getters = {
  getContacts: (state) => {
    return state.contactsList;
  },
  getContact: (state) => (id) => {
    return state.contactsList.find((contact) => contact.id === id);
  },
};

export default getters;
