import { apiClient } from "./client";
import type { ApiResponse, SubmissionHistory } from "./types";
export async function getSubmissionHistory(matchingId: number): Promise<SubmissionHistory[]> { const { data } = await apiClient.get<ApiResponse<SubmissionHistory[]>>(`/matchings/${matchingId}/submissions`); return data.result; }
export async function requestRevision(submissionId: number, reason: string) { const { data } = await apiClient.post<ApiResponse<unknown>>(`/submissions/${submissionId}/revision-requests`, { reason }); return data.result; }
export async function approveSubmission(submissionId: number) { const { data } = await apiClient.post<ApiResponse<unknown>>(`/submissions/${submissionId}/approve`); return data.result; }
