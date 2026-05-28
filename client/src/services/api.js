import axios from 'axios';

// Create a configured Axios client
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 45000, // Large timeout for AI analysis Vision pipelines
  headers: {
    'Content-Type': 'application/json',
  }
});

// Configure default response interceptors for standardized error mapping
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || 'A luxury server exception occurred. Refitting details.';
    console.error('[AURA API Client Error]:', message);
    return Promise.reject(new Error(message));
  }
);

export default api;
