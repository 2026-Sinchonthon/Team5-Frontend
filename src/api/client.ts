import axios, { isAxiosError } from "axios";
import { getAccessToken } from "./token";
import type { ApiResponse } from "./types";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api/v1",
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<ApiResponse<unknown>>(error)) {
    return (
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      fallback
    );
  }
  return fallback;
}
