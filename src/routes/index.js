import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/Home.vue";
import ContactsPage from "../pages/Contacts.vue";
import ExpensesPage from "../pages/Expenses.vue";
import TasksPage from "../pages/Tasks.vue";
import NotesPage from "../pages/Notes.vue";

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
