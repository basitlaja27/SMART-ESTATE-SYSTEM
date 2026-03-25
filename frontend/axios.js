import axios from 'axios';

const api = axios.create({
  // In production, this uses your Render backend URL.
  // In local development (if the variable is missing), it defaults to the relative path and uses your proxy.
  baseURL: import.meta.env.VITE_API_URL || '', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
