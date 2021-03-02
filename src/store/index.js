import { createStore } from "vuex";

import contactModule from "./modules/contacts";
import authModule from "./modules/auth";
import todosModule from "./modules/todos";

const store = createStore({
  modules: {
    contacts: contactModule,
    auth: authModule,
    todos: todosModule,
  },
});

export default store;
