const getters = {
  getTodos(state) {
    console.log(state.todosList);
    return state.todosList;
  },
  getTask: (state) => (id) => {
    return state.todosList.find((task) => task.id === id);
  },
};

export default getters;
