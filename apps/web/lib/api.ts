import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

// Attach Bearer token from localStorage (dual: cookie + header)
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("ks_token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

// Queue-based 401 refresh
let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: unknown) => void
    reject: (reason?: unknown) => void
}> = []

const processQueue = (error: unknown) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error)
        else prom.resolve()
    })
    failedQueue = []
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then(() => api(originalRequest))
                    .catch((err) => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const res = await axios.post(
                    `${API_BASE_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                )

                // If server returns a new access token, store it
                const newToken = res.data?.accessToken
                if (newToken && typeof window !== "undefined") {
                    localStorage.setItem("ks_token", newToken)
                    document.cookie = `ks_token=${newToken}; path=/; max-age=${60 * 60 * 24 * 7}`
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                }

                processQueue(null)
                return api(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError)
                if (typeof window !== "undefined") {
                    localStorage.removeItem("ks_token")
                    document.cookie = "ks_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                    if (
                        !window.location.pathname.startsWith("/entrar") &&
                        !window.location.pathname.startsWith("/registar") &&
                        !window.location.pathname.startsWith("/auth")
                    ) {
                        window.location.href = "/entrar"
                    }
                }
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

// Backward compat default export
export default api
