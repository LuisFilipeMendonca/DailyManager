import { v4 as uuidv4 } from "uuid";

const mutations = {
  addToast(state, payload) {
    state.toasts.push({ ...payload, id: uuidv4() });
  },
  deleteToast(state, payload) {
    const toastIdx = state.toasts.findIndex((toast) => toast.id === payload);
    state.toasts.splice(toastIdx, 1);
  },
};

export default mutations;
