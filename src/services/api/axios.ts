import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG, STORAGE_KEYS } from "@/constants/config";

/**
 * Centralized Axios instance.
 *
 * - Base URL from VITE_API_URL (falls back to /api)
 * - Auth token attached from localStorage
 * - 401 -> clears session and redirects to /auth/login
 * - 5xx -> surfaced with normalized error
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(STORAGE_KEYS.authToken);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    if (status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEYS.authToken);
      if (!window.location.pathname.startsWith("/auth")) {
        window.location.assign("/auth/login");
      }
    }
    return Promise.reject({
      status,
      message:
        error.response?.data?.message ?? error.message ?? "Unknown error",
      cause: error,
    });
  },
);

export type ApiError = { status?: number; message: string; cause?: unknown };
