// src/services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/login', { email, password }),
  register: (email, password, name) => api.post('/register', { email, password, name }),
  verifyToken: () => api.get('/verify-token'),
};

export const predictionAPI = {
  predict: (formData) => api.post('/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getHistory: (page = 1, per_page = 10) => 
    api.get(`/history?page=${page}&per_page=${per_page}`),
};

export const userAPI = {
  getProfile: () => api.get('/profile'),
};

export const systemAPI = {
  health: () => api.get('/health'),
  modelInfo: () => api.get('/model-info'),
};

export default api;