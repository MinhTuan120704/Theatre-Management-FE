import axios from "axios";
import ENDPOINTS from "./endpoints";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const raw = localStorage.getItem("accessToken");
    // Guard against stringified undefined/null stored accidentally
    if (raw && raw !== "undefined" && raw !== "null" && config.headers) {
      // Normalize token: some responses may already include the 'Bearer ' prefix
      const token = raw.startsWith("Bearer ") ? raw : `Bearer ${raw}`;
      config.headers.Authorization = token;
    }
    // Debug: log whether we attached an auth header (helps troubleshoot missing token issues)
    try {
      // eslint-disable-next-line no-console
      console.debug("axios request:", config.url, "auth:", !!config.headers?.Authorization);
    } catch (e) {
      /* ignore */
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-console
      console.debug("axios response 401 for:", originalRequest?.url);
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL.replace(/\/$/, "")}${ENDPOINTS?.AUTH?.REFRESH_TOKEN || "/auth/refresh-token"}`,
            { refreshToken }
          );
          const data = response.data;
          const accessToken = typeof data === "string" ? data : data?.accessToken;
          if (!accessToken) throw new Error("No access token returned from refresh");

          // Save normalized token (strip accidental 'Bearer ' if returned)
          const normalized = accessToken && accessToken.startsWith
            ? (accessToken.startsWith("Bearer ") ? accessToken.slice(7) : accessToken)
            : accessToken;
          if (!normalized) throw new Error("No access token returned from refresh");

          localStorage.setItem("accessToken", normalized);

          // Update axios default header and original request header
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${normalized}`;
          if (originalRequest.headers) {
            (originalRequest.headers as any)["Authorization"] = `Bearer ${normalized}`;
          }

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed - clear auth and forward error
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Export types for use in services
export type { AxiosResponse, AxiosError };
