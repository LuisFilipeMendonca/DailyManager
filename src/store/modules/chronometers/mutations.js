const mutations = {
  addChronometers(state, payload) {
    state.chronometers = payload;
  },
  addChronometer(state, payload) {
    state.chronometers.unshift(payload);
  },
  updateChronometer(state, payload) {
    const chronometerIdx = state.chronometers.findIndex(
      (chronometer) => chronometer.id === payload.id
    );
    state.chronometers[chronometerIdx] = payload;
  },
  deleteChronometer(state, payload) {
    const chronometerIdx = state.chronometers.findIndex(
      (chronometer) => chronometer.id === payload
    );
    state.chronometers.splice(chronometerIdx, 1);
  },
};

export default mutations;
