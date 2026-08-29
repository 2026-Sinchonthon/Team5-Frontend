import type { JobPostCategory } from "../constants/jobCategories";

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  error: { message: string } | null;
}

export type MemberRole = "STUDENT" | "OWNER";
export type MemberStatus = "ACTIVE" | "WITHDRAWN";
export type JobPostStatus = "OPEN" | "MATCHED" | "COMPLETED" | "CANCELED";
export type ApplicationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELED";
export type MatchingStatus =
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "REVISION_REQUESTED"
  | "COMPLETED"
  | "CANCELED";
export type SubmissionStatus = "SUBMITTED" | "REVISION_REQUESTED" | "APPROVED";

export interface MemberMe { memberId: number; email: string; name: string; role: MemberRole; status: MemberStatus; profile: { universityName?: string; major?: string; introduction?: string; businessName?: string; address?: string } }
export interface ApplicationSummary { applicationId: number; jobPost: { jobPostId: number; title: string; businessName: string; budget: number; deadline: string }; status: ApplicationStatus; appliedAt: string }
export interface Applicant { applicationId: number; student: { memberId: number; name: string; university: string; major: string; introduction: string }; message: string; status: ApplicationStatus; appliedAt: string }
export interface MatchingSummary { matchingId: number; jobPost: { jobPostId: number; title: string; businessName: string; thumbnailImageUrl: string | null }; agreedAmount: number; deadline: string; revisionCount: number; revisionLimit: number; status: MatchingStatus }
export interface MatchingDetail extends MatchingSummary { owner: { memberId: number; name: string; businessName: string }; student: { memberId: number; name: string; university: string; major: string }; jobPost: MatchingSummary["jobPost"] & { description: string } }
export interface SubmissionHistory { submissionId: number; roundNumber: number; description: string | null; status: SubmissionStatus; submittedAt: string; files: { fileId: number; originalName: string; fileUrl: string }[]; revisionRequest: { reason: string; requestedAt: string } | null }

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  member: {
    memberId: number;
    name: string;
    role: MemberRole;
  };
}

export interface SignupOwnerRequest {
  email: string;
  password: string;
  name: string;
  businessName: string;
  address?: string;
  introduction?: string;
}

export interface SignupOwnerResponse {
  memberId: number;
  email: string;
  name: string;
  role: MemberRole;
}

export interface SignupStudentRequest {
  email: string;
  password: string;
  name: string;
  major?: string;
  introduction?: string;
}

export interface JobPostImage {
  imageId: number;
  imageUrl: string;
  sortOrder: number;
}

export interface JobPostSummary {
  jobPostId: number;
  title: string;
  businessName: string;
  thumbnailImageUrl: string | null;
  category: JobPostCategory;
  budget: number;
  deadline: string;
  status: JobPostStatus;
  createdAt: string;
}

export interface JobPostListResponse {
  content: JobPostSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface JobPostDetail {
  jobPostId: number;
  title: string;
  description: string;
  images: JobPostImage[];
  category: JobPostCategory;
  budget: number;
  deadline: string;
  revisionLimit: number;
  status: JobPostStatus;
  owner: {
    ownerId: number;
    businessName: string;
    address: string | null;
  };
  createdAt: string;
}

export interface MyJobPost {
  jobPostId: number;
  title: string;
  thumbnailImageUrl: string | null;
  category: JobPostCategory;
  budget: number;
  status: JobPostStatus;
  applicationCount: number;
  deadline: string;
}

export interface JobPostListParams {
  category?: JobPostCategory;
  status?: JobPostStatus;
  minBudget?: number;
  maxBudget?: number;
  page?: number;
  size?: number;
  sort?: "LATEST" | "DEADLINE" | "BUDGET_HIGH";
}

export interface CreateJobPostRequest {
  title: string;
  description: string;
  rawRequest?: string;
  images?: File[];
  category: JobPostCategory;
  budget: number;
  deadline: string;
  revisionLimit?: number;
}

export interface CreateJobPostResponse {
  jobPostId: number;
  title: string;
  images: JobPostImage[];
  category: JobPostCategory;
  budget: number;
  deadline: string;
  status: JobPostStatus;
  createdAt: string;
}

export type UpdateJobPostRequest = Partial<
  Pick<
    CreateJobPostRequest,
    "title" | "description" | "category" | "budget" | "deadline"
  >
>;
