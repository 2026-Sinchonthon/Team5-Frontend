import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobPost } from "../../api/jobPosts";
import { getApiErrorMessage } from "../../api/client";
import type { JobPostDetail } from "../../api/types";
import { jobCategoryLabel } from "../../constants/jobCategories";
import "./JobCreatePage.css";
import "./JobDetailPage.css";

export default function JobDetailPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState<JobPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;
    let cancelled = false;
    setIsLoading(true);
    setErrorMessage(null);

    getJobPost(Number(jobId))
      .then((data) => {
        if (!cancelled) setJob(data);
      })
      .catch((error) => {
        if (!cancelled)
          setErrorMessage(
            getApiErrorMessage(error, "공고 정보를 불러오지 못했습니다."),
          );
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [jobId]);

  return (
    <div className="job-create">
      <div className="job-create__header">
        <button
          type="button"
          className="job-create__back"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h1 className="job-create__title">공고 상세</h1>
      </div>

      {isLoading && <p className="job-create__error">불러오는 중...</p>}
      {!isLoading && errorMessage && (
        <p className="job-create__error">{errorMessage}</p>
      )}

      {!isLoading && !errorMessage && job && (
        <div className="job-detail">
          {job.images.length > 0 ? (
            <img
              className="job-detail__image"
              src={job.images[0].imageUrl}
              alt=""
            />
          ) : (
            <div className="job-detail__image job-detail__image--placeholder" />
          )}

          <h2 className="job-detail__title">{job.title}</h2>
          <p className="job-detail__meta">
            {jobCategoryLabel(job.category)} · {job.budget.toLocaleString()}원
          </p>
          <p className="job-detail__meta">
            마감일 {job.deadline.slice(0, 10)}
          </p>

          <p className="job-detail__description">{job.description}</p>

          <button
            type="button"
            className="job-create__submit"
            onClick={() => navigate(`/owner/jobs/${job.jobPostId}/edit`)}
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}
