import { createStore } from "vuex";

import contactModule from "./modules/contacts";

console.log(contactModule);
const store = createStore({
  modules: {
    contacts: contactModule,
  },
});

export default store;
