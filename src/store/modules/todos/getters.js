import { timeWithoutSec } from "../../../util/dates";

const getters = {
  getTodos(state) {
    return state.todosList.map((task) => ({
      ...task,
      time: timeWithoutSec(task.time),
    }));
  },
  getTask: (state) => (id) => {
    const task = state.todosList.find((task) => task.id === id);
    return { ...task, time: timeWithoutSec(task.time) };
  },
  hasTasks: (state) => (date) => {
    return state.todosList.some(
      (task) => new Date(task.date).getTime() === date.getTime()
    );
  },
};

export default getters;
