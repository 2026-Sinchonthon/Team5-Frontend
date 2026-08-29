import { apiClient } from "./client";
import type { ApiResponse, MatchingDetail, MatchingSummary } from "./types";
export async function getMyMatchings(): Promise<MatchingSummary[]> { const { data } = await apiClient.get<ApiResponse<MatchingSummary[]>>("/matchings/me"); return data.result; }
export async function getMatching(matchingId: number): Promise<MatchingDetail> { const { data } = await apiClient.get<ApiResponse<MatchingDetail>>(`/matchings/${matchingId}`); return data.result; }
