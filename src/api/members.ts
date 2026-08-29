import { apiClient } from "./client";
import type { ApiResponse, MemberMe } from "./types";
export async function getMyProfile(): Promise<MemberMe> { const { data } = await apiClient.get<ApiResponse<MemberMe>>("/members/me"); return data.result; }
