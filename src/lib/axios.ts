import axios from "axios";
import { getToken, removeToken } from "./cookies";

export const UNAUTHORIZED_EVENT = "auth:unauthorized";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // يخلي المتصفح يبعت/يستقبل الكوكيز لو الباك بيسيت كوكي httpOnly
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginRequest = error.config?.url?.includes("/auth/login");

        // التوكن منتهي أو غلط -> امسحه وبلّغ الـ AuthProvider
        if (error.response?.status === 401 && !isLoginRequest) {
            removeToken();
            window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
        }

        return Promise.reject(error);
    },
);
