import { timeWithoutSec } from "../../../util/dates";

const getters = {
  getTodos(state) {
    const todos = state.todosList.map((task) => ({
      ...task,
      time: timeWithoutSec(task.time),
    }));
    return todos;
  },
  getTask: (state) => (id) => {
    const task = state.todosList.find((task) => task.id === id);
    return { ...task, time: timeWithoutSec(task.time) };
  },
  hasTasks: (state) => (date) => {
    return state.todosList.some(
      (task) =>
        new Date(
          new Date(task.date).getFullYear(),
          new Date(task.date).getMonth(),
          new Date(task.date).getDate()
        ).getTime() === date.getTime()
    );
  },
};

export default getters;
