import axios from "axios";

const host = import.meta.env.VITE_API_URL;


const api = axios.create({ baseURL: host, withCredentials: true });

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => Promise.reject(error),
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = await axios.post(`${host}/auth/refresh`, { withCredentials: true });
                if (refresh.status === 200) {
                    const newToken = refresh.data.token;
                    sessionStorage.setItem("access_token", newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest); // retry
                }
            } catch (refreshError) {
                sessionStorage.clear();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;