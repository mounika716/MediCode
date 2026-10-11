import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('hx_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('hx_token');
      localStorage.removeItem('hx_user');
    }
    return Promise.reject(err);
  }
);

export default API;