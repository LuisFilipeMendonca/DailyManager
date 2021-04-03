import Dates from "../../../helpers/Dates";
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
  hasTasks: (state) => (timestamps) => {
    return state.todosList.some(
      (task) => new Dates(task.date).getTimestampsWithoutTime() === timestamps
    );
  },
};

export default getters;
