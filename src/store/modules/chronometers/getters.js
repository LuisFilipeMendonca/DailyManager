const getters = {
  getChronometers(state) {
    return state.chronometers;
  },

  getChronometer: (state) => (id) => {
    return state.chronometers.find((chronometer) => chronometer.id === id);
  },
  hasChronometers(state) {
    console.log(state);
    return state.chronometers.length > 0;
  },
};

export default getters;
