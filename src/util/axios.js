import axios from "axios";

const port = process.env.BACKEND_PORT || 3002;

export default axios.create({
  baseURL: `http://localhost:${port}`,
});
