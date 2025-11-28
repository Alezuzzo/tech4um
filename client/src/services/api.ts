import axios from 'axios';

const api = axios.create({
  baseURL: "https://tech4um.onrender.com",
});

export default api;