const getters = {
  getChronometers(state) {
    return state.chronometers;
  },

  getChronometer: (state) => (id) => {
    return state.chronometers.find((chronometer) => chronometer.id === id);
  },
};

export default getters;
