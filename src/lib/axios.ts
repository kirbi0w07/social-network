import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Interceptor para añadir el Bearer Token automáticamente
axiosInstance.interceptors.request.use((config) => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
        config.headers.Authorization = authStore.getFullToken;
    }

    return config;

}, (error) => {
    return Promise.reject(error);
});
export default axiosInstance;

