import axios from "../../../util/axios";

const actions = {
  async register(_, data) {
    try {
      console.log(data);
      await axios.post("/users", data);
    } catch (e) {
      console.log(e);
    }
  },
};

export default actions;
