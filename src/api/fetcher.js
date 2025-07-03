import axios from "axios";

const host = import.meta.env.VITE_API_URL;


const api = axios.create({ baseURL: host, withCredentials: true });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => Promise.reject(error),
);


api.interceptors.response.use(async (resp) => {
    const lastRequest = resp.request;
    if (resp.status === 401) {
        const newToken = await axios.get(`${host}/auth/refresh`);
        if (newToken.status === 200) {
            sessionStorage.setItem("access_token", newToken.data.token);
            lastRequest.headers.Authorization = `Bearer ${newToken.data.token}`;
            return api(lastRequest);
        }
    }
    return resp;
})

export default api;