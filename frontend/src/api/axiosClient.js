import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true, // send cookies (JWT httpOnly cookie)
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor ──────────────────────────────────────────────────────
// Attach Bearer token from localStorage if present (fallback for non-cookie auth)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('tms_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor ─────────────────────────────────────────────────────
// Redirect to /login on 401; surface error message from API body
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tms_user');
      localStorage.removeItem('tms_token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data?.message ?? error.message ?? 'Request failed');
  }
);

export default axiosClient;
