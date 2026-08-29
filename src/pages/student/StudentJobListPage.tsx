import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { listJobPosts } from "../../api/jobPosts";
import { getApiErrorMessage } from "../../api/client";
import type { JobPostSummary } from "../../api/types";
import { jobCategoryLabel } from "../../constants/jobCategories";
import { ChevronLeftIcon, ClockIcon, FilterIcon, SearchIcon } from "../../components/common/Icon";
import "./StudentJobs.css";

export default function StudentJobListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSubmittedToast, setShowSubmittedToast] = useState(
    location.state?.matchingSubmitted === true,
  );
  const [jobs, setJobs] = useState<JobPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!showSubmittedToast) return;

    const timer = window.setTimeout(() => {
      setShowSubmittedToast(false);
      navigate(location.pathname, { replace: true, state: null });
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [location.pathname, navigate, showSubmittedToast]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setErrorMessage(null);

    listJobPosts()
      .then((response) => {
        if (!cancelled) setJobs(response.content);
      })
      .catch((error) => {
        if (!cancelled)
          setErrorMessage(
            getApiErrorMessage(error, "구인 목록을 불러오지 못했습니다."),
          );
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="jobs-page">
      <header className="jobs-page__header">
        <button type="button" className="jobs-page__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <ChevronLeftIcon />
        </button>
        <h1>구인 목록</h1>
      </header>

      <div className="jobs-page__search-row">
        <div className="jobs-page__search-bar">
          <SearchIcon width={16} height={16} />
          <input type="text" placeholder="검색어를 입력해주세요" readOnly />
        </div>
        <button type="button" className="jobs-page__filter-button" aria-label="필터">
          <FilterIcon width={18} height={18} />
        </button>
      </div>

      {isLoading && <p className="jobs-page__status">불러오는 중...</p>}
      {!isLoading && errorMessage && (
        <p className="jobs-page__status">{errorMessage}</p>
      )}
      {!isLoading && !errorMessage && jobs.length === 0 && (
        <p className="jobs-page__status">등록된 공고가 없습니다.</p>
      )}

      <div className="job-list">
        {jobs.map((job) => (
          <button
            key={job.jobPostId}
            type="button"
            className="job-card"
            onClick={() => navigate(`/student/jobs/${job.jobPostId}`)}
          >
            {job.thumbnailImageUrl ? (
              <img
                className="job-card__thumbnail"
                src={job.thumbnailImageUrl}
                alt=""
              />
            ) : (
              <span className="job-card__thumbnail" aria-hidden="true">
                {job.businessName.slice(0, 1)}
              </span>
            )}
            <span className="job-card__content">
              <strong>{job.title}</strong>
              <span className="job-card__meta">
                <ClockIcon width={13} height={13} />
                {job.deadline.slice(0, 10)}
              </span>
              <span className="job-card__reward">
                {job.budget.toLocaleString()}원
              </span>
              <span className="job-card__category">
                {jobCategoryLabel(job.category)}
              </span>
            </span>
          </button>
        ))}
      </div>

      {showSubmittedToast && (
        <div className="job-list__toast" role="status">
          매칭 신청 완료!
        </div>
      )}
    </section>
  );
}
