import axios from "axios";
import { ACCESS_TOKEN } from "../utils/constants";

const api = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API_URL,
  baseURL: "http://garage1.localhost:8000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
