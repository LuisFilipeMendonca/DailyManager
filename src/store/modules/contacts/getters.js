const objSort = (a, b, field) => {
  if (a[field] > b[field]) return 1;
  if (a[field] < b[field]) return -1;
  return 0;
};

const getters = {
  getContacts: (state) => {
    const sortedList = state.contactsList.sort((a, b) => objSort(a, b, "name"));
    return sortedList;
  },
  getContact: (state) => (id) => {
    return state.contactsList.find((contact) => contact.id === id);
  },
};

export default getters;
