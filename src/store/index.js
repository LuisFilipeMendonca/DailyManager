import { createStore } from "vuex";

import contactModule from "./modules/contacts";
import authModule from "./modules/auth";
import todosModule from "./modules/todos";
import chronometerModule from "./modules/chronometers";
import accountModule from "./modules/accounts";
import toastsModule from "./modules/toasts";

const store = createStore({
  modules: {
    contacts: contactModule,
    auth: authModule,
    todos: todosModule,
    chronometers: chronometerModule,
    account: accountModule,
    toasts: toastsModule,
  },
});

export default store;
