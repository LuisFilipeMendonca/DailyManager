import { objSort } from "../../../util/generics.js";

const getters = {
  getContacts: (state) => {
    const sortedList = state.contactsList.sort(
      ({ name: aName }, { name: bName }) => objSort(aName, bName)
    );

    return sortedList;
  },
  getContact: (state) => (id) => {
    return state.contactsList.find((contact) => contact.id === id);
  },
};

export default getters;
