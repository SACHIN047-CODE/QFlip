import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Environment-based API URL with default fallback
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach Auth Bearer token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('qflip_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Unified error handling and response unwrapping
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected network error occurred';
    console.warn(`[QFlip API Error]`, message);
    return Promise.reject(new Error(message));
  }
);

// Helper for simulating async mock delays realistically
export const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

