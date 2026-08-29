import { apiClient } from "./client";
import type { ApiResponse, MemberMeResponse } from "./types";

export async function getMyProfile(): Promise<MemberMeResponse> {
  const { data } =
    await apiClient.get<ApiResponse<MemberMeResponse>>("/members/me");
  return data.result;
}
