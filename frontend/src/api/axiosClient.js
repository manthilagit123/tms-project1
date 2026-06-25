
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    withCredentials: true, // sends the httpOnly auth cookie Person 1's backend sets
});

axiosClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err.response?.data || { message: 'Network error' })
);

export default axiosClient;