import { objSort } from "../../../util/generics.js";

const getters = {
  getContacts: (state) => {
    const sortedList = state.contactsList.sort(({ name: a }, { name: b }) =>
      objSort(a, b)
    );

    return sortedList;
  },
  getContact: (state) => (id) => {
    return state.contactsList.find((contact) => contact.id === id);
  },
  hasContacts: (state) => {
    return state.contactsList.length > 0;
  },
};

export default getters;
