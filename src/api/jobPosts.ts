import { apiClient } from "./client";
import type {
  ApiResponse,
  CreateJobPostRequest,
  CreateJobPostResponse,
  JobPostDetail,
  JobPostListParams,
  JobPostListResponse,
  MyJobPost,
  UpdateJobPostRequest,
} from "./types";

export async function listJobPosts(
  params: JobPostListParams = {},
): Promise<JobPostListResponse> {
  const { data } = await apiClient.get<ApiResponse<JobPostListResponse>>(
    "/job-posts",
    { params },
  );
  return data.result;
}

export async function getJobPost(jobPostId: number): Promise<JobPostDetail> {
  const { data } = await apiClient.get<ApiResponse<JobPostDetail>>(
    `/job-posts/${jobPostId}`,
  );
  return data.result;
}

export async function getMyJobPosts(): Promise<MyJobPost[]> {
  const { data } =
    await apiClient.get<ApiResponse<MyJobPost[]>>("/job-posts/me");
  return data.result;
}

export async function createJobPost(
  payload: CreateJobPostRequest,
  images: File[] = [],
): Promise<CreateJobPostResponse> {
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(payload)], { type: "application/json" }),
  );
  for (const image of images) {
    formData.append("images", image);
  }

  const { data } = await apiClient.post<ApiResponse<CreateJobPostResponse>>(
    "/job-posts",
    formData,
  );
  return data.result;
}

export async function updateJobPost(
  jobPostId: number,
  payload: UpdateJobPostRequest,
): Promise<JobPostDetail> {
  const { data } = await apiClient.patch<ApiResponse<JobPostDetail>>(
    `/job-posts/${jobPostId}`,
    payload,
  );
  return data.result;
}

export async function deleteJobPost(jobPostId: number): Promise<void> {
  await apiClient.delete(`/job-posts/${jobPostId}`);
}
