import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============== Cookie-based Auth ==============
// Tokens are stored in httpOnly cookies (set by the server).
// JavaScript NEVER has access to tokens — this prevents XSS token theft.
// The browser sends cookies automatically with every request.

// Create axios instance with credentials (sends cookies automatically)
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    withCredentials: true, // CRITICAL: sends httpOnly cookies with every request
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor - handle token refresh via cookies
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401, try to refresh via cookie-based endpoint
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue this request while refreshing
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        // Retry with cookies (no token header needed)
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Refresh endpoint reads refresh_token from cookie
                await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, {
                    withCredentials: true,
                });

                processQueue(null);

                // Retry original request (new access_token cookie is set)
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                // Redirect to auth page on refresh failure — but NOT if already there (avoids infinite loop)
                if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
                    window.location.href = '/auth';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
