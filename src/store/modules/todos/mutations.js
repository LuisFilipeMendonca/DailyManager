import { objSort } from "../../../util/generics.js";

const mutations = {
  addTodos(state, payload) {
    state.todosList = payload;
  },
  addTask(state, payload) {
    let stateCopy = [...state.todosList];
    stateCopy.push(payload);
    state.todosList = stateCopy.sort((a, b) => {
      const aTime = a.time
        ? new Date(`${a.date}T${a.time}Z`).getTime()
        : Infinity;
      const bTime = b.time
        ? new Date(`${b.date}T${b.time}Z`).getTime()
        : Infinity;
      return objSort(aTime, bTime);
    });
  },
  updateTask(state, payload) {
    const taskIdx = state.todosList.findIndex((task) => task.id === payload.id);
    state.todosList[taskIdx] = payload;
  },
  deleteTask(state, payload) {
    const taskIdx = state.todosList.findIndex((task) => task.id === payload);
    state.todosList.splice(taskIdx, 1);
  },
};

export default mutations;
