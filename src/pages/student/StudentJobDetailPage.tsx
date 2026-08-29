import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobPost } from "../../api/jobPosts";
import { getApiErrorMessage } from "../../api/client";
import type { JobPostDetail } from "../../api/types";
import { jobCategoryLabel } from "../../constants/jobCategories";
import jobHero from "../../assets/design/job-hero.png";
import { ChevronLeftIcon } from "../../components/common/Icon";
import "./StudentJobs.css";

export default function StudentJobDetailPage() {
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

  if (isLoading) {
    return (
      <section className="jobs-page jobs-page--empty">
        <p>불러오는 중...</p>
      </section>
    );
  }

  if (errorMessage || !job) {
    return (
      <section className="jobs-page jobs-page--empty">
        <p>{errorMessage ?? "공고를 찾을 수 없습니다."}</p>
        <button type="button" onClick={() => navigate("/student/jobs")}>목록으로 돌아가기</button>
      </section>
    );
  }

  return (
    <article className="job-detail">
      <button type="button" className="job-detail__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
        <ChevronLeftIcon />
      </button>

      <h1>{job.title}</h1>
      <p className="job-detail__meta">{job.owner.businessName}</p>

      <div
        className="job-detail__hero"
        style={{
          backgroundImage: job.images[0]
            ? `url(${job.images[0].imageUrl})`
            : `url(${jobHero})`,
        }}
      />

      <div className="job-detail__price-row">
        <strong>사례금</strong>
        <span>{job.budget.toLocaleString()}원</span>
      </div>
      <p className="job-detail__deadline-row">
        <strong>마감 기한</strong> | {job.deadline.slice(0, 10)}
      </p>
      <p className="job-detail__deadline-row">
        <strong>카테고리</strong> | {jobCategoryLabel(job.category)}
      </p>

      <hr className="job-detail__divider" />

      <p className="job-detail__description">{job.description}</p>

      <hr className="job-detail__divider" />

      <button
        type="button"
        className="job-detail__apply"
        onClick={() => navigate(`/student/jobs/${job.jobPostId}/apply`)}
      >
        매칭 신청하기
      </button>
    </article>
  );
}
