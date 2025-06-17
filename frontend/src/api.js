import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update as needed
  withCredentials: true,
});

export default api;