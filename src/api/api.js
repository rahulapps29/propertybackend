// src/api.js
import axios from "axios";

export const BASE_URL = "https://rahulprofile.algoapp.in";

const api = axios.create({
  baseURL: BASE_URL, // ✅ using the variable here
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default api;
