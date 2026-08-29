import axios, { isAxiosError } from "axios";
import { getAccessToken } from "./token";
import type { ApiResponse } from "./types";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api/v1",
});

apiClient.interceptors.request.use((config) => {
  if (config.url?.startsWith("/auth/")) return config;
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<ApiResponse<unknown>>(error)) {
    if (error.response?.status === 401) return "로그인이 만료되었거나 필요합니다. 다시 로그인해주세요.";
    if (error.response?.status === 403) return "이 기능을 사용할 권한이 없습니다.";
    if (error.response?.status === 500) return "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    const details = error.response?.data?.error;
    if (details && typeof details === "object" && "message" in details) {
      return String(details.message);
    }
    if (details && typeof details === "object") {
      const firstMessage = Object.values(details)[0];
      if (typeof firstMessage === "string") return firstMessage;
    }
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}
