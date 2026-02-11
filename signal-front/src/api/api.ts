import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  timeout: 5000,
});

export default api;
