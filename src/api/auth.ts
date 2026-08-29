import { apiClient } from "./client";
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  SignupOwnerRequest,
  SignupOwnerResponse,
  SignupStudentRequest,
} from "./types";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    payload,
  );
  return data.result;
}

export async function signupOwner(
  payload: SignupOwnerRequest,
): Promise<SignupOwnerResponse> {
  const { data } = await apiClient.post<ApiResponse<SignupOwnerResponse>>(
    "/auth/signup/owner",
    payload,
  );
  return data.result;
}

export async function signupStudent(payload: SignupStudentRequest) {
  const { data } = await apiClient.post<ApiResponse<{ id: number }>>(
    "/auth/signup/student",
    payload,
  );
  return data.result;
}
