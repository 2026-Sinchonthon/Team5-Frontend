import { apiClient } from "./client";
import type { ApiResponse, Applicant, ApplicationSummary } from "./types";
export async function applyToJob(jobPostId: number, message: string, image?: File) { const form = new FormData(); form.append("message", message); if (image) form.append("image", image); const { data } = await apiClient.post<ApiResponse<unknown>>(`/job-posts/${jobPostId}/applications`, form); return data.result; }
export async function getMyApplications(): Promise<ApplicationSummary[]> { const { data } = await apiClient.get<ApiResponse<ApplicationSummary[]>>("/applications/me"); return data.result; }
export async function getApplicants(jobPostId: number): Promise<Applicant[]> { const { data } = await apiClient.get<ApiResponse<Applicant[]>>(`/job-posts/${jobPostId}/applications`); return data.result; }
export async function acceptApplication(applicationId: number, agreedAmount: number, deadline: string) { const { data } = await apiClient.post<ApiResponse<unknown>>(`/applications/${applicationId}/accept`, { agreedAmount, deadline }); return data.result; }
