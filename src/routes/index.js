import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/Home.vue";
import ContactsPage from "../pages/Contacts.vue";
import ExpensesPage from "../pages/Expenses.vue";
import TasksPage from "../pages/Tasks.vue";
import NotesPage from "../pages/Notes.vue";

import FormContact from "../layout/FormContact.vue";
import FormTask from "../layout/FormTask.vue";

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
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: TasksPage,
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
    component: NotesPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
