const getters = {
  getTodos(state) {
    return state.todosList;
  },
  getTask: (state) => (id) => {
    console.log(id);
    return state.todosList.find((task) => task.id === id);
  },
};

export default getters;
