import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// Attach the JWT access token to every request, if one is stored.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
