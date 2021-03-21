import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/Home.vue";
import ContactsPage from "../pages/Contacts.vue";
import ExpensesPage from "../pages/Expenses.vue";
import TasksPage from "../pages/Tasks.vue";
import ChronometerPage from "../pages/Chronometer.vue";
import AuthPage from "../pages/Auth.vue";

import FormContact from "../layout/FormContact.vue";
import FormTask from "../layout/FormTask.vue";

import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: ContactsPage,
    meta: {
      isLoginRequired: true,
    },
    children: [
      {
        path: "add",
        component: FormContact,
      },
      {
        path: "edit/:id",
        component: FormContact,
      },
    ],
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: ExpensesPage,
    meta: {
      isLoginRequired: true,
    },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: TasksPage,
    meta: {
      isLoginRequired: true,
    },
    children: [
      {
        path: "add",
        component: FormTask,
      },
      {
        path: "edit/:id",
        component: FormTask,
      },
    ],
  },
  {
    path: "/notes",
    name: "Notes",
    component: ChronometerPage,
    meta: {
      isLoginRequired: true,
    },
  },
  {
    path: "/authentication",
    name: "Authentication",
    component: AuthPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  const isLoginRequired = to.meta.isLoginRequired;

  if (isLoginRequired && !isLoggedIn) {
    next("/authentication");
  } else {
    next();
  }
});

export default router;
