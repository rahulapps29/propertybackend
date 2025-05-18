// src/api.js
import axios from "axios";

export const BASE_URL = "http://192.168.1.198:5001";

const api = axios.create({
  baseURL: BASE_URL, // ✅ using the variable here
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default api;
