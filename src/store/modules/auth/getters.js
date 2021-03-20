const getters = {
  getUserId(state) {
    return state.userId;
  },
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  getUserName(state) {
    return state.userName;
  },
};

export default getters;
