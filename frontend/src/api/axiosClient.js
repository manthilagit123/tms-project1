
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
    const stored = sessionStorage.getItem('user');
    if (stored) {
        const user = JSON.parse(stored);
        if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    }
    return config;
});

axiosClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err.response?.data || { message: 'Network error' })
);

export default axiosClient;