import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { listJobPosts } from "../../api/jobPosts";
import { getApiErrorMessage } from "../../api/client";
import type { JobPostSummary } from "../../api/types";
import { jobCategoryLabel, type JobPostCategory } from "../../constants/jobCategories";
import "./JobsPage.css";

const UPLOAD_TOAST_DURATION_MS = 2000;

interface JobsPageLocationState {
  justUploaded?: boolean;
}

export default function JobsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") as JobPostCategory | null;
  const [showUploadToast, setShowUploadToast] = useState(
    Boolean((location.state as JobsPageLocationState | null)?.justUploaded),
  );
  const [jobs, setJobs] = useState<JobPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!showUploadToast) return;

    navigate(location.pathname + location.search, {
      replace: true,
      state: null,
    });
    const timer = setTimeout(
      () => setShowUploadToast(false),
      UPLOAD_TOAST_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [showUploadToast]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setErrorMessage(null);

    listJobPosts(selectedCategory ? { category: selectedCategory } : {})
      .then((response) => {
        if (!cancelled) setJobs(response.content);
      })
      .catch((error) => {
        if (!cancelled)
          setErrorMessage(
            getApiErrorMessage(error, "공고 목록을 불러오지 못했습니다."),
          );
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedCategory]);

  return (
    <div className="owner-jobs">
      <button
        type="button"
        className="owner-jobs__back"
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <div className="owner-jobs__search-row">
        <span className="owner-jobs__search-label">검색 결과</span>
        <button
          type="button"
          className="owner-jobs__filter-button"
          aria-label="검색 및 필터"
          onClick={() =>
            navigate(
              selectedCategory
                ? `/owner/jobs/search?category=${encodeURIComponent(selectedCategory)}`
                : "/owner/jobs/search",
            )
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
          </svg>
        </button>
        {selectedCategory && (
          <span className="owner-jobs__filter-chip">
            {jobCategoryLabel(selectedCategory)}
          </span>
        )}
      </div>

      {isLoading && <p className="owner-jobs__status">불러오는 중...</p>}
      {!isLoading && errorMessage && (
        <p className="owner-jobs__status">{errorMessage}</p>
      )}
      {!isLoading && !errorMessage && jobs.length === 0 && (
        <p className="owner-jobs__status">등록된 공고가 없습니다.</p>
      )}

      <ul className="owner-jobs__list">
        {jobs.map((job) => (
          <li key={job.jobPostId} className="owner-jobs__item">
            {job.thumbnailImageUrl ? (
              <img
                className="owner-jobs__thumbnail"
                src={job.thumbnailImageUrl}
                alt=""
              />
            ) : (
              <div className="owner-jobs__thumbnail" />
            )}
            <p className="owner-jobs__name">{job.title}</p>
          </li>
        ))}
      </ul>

      {showUploadToast && (
        <div className="owner-jobs__toast" role="status">
          게시글 업로드 완료!
        </div>
      )}
    </div>
  );
}
