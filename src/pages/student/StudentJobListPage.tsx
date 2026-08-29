import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { studentJobs } from "../../data/studentJobs";
import "./StudentJobs.css";

export default function StudentJobListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSubmittedToast, setShowSubmittedToast] = useState(
    location.state?.matchingSubmitted === true,
  );

  useEffect(() => {
    if (!showSubmittedToast) return;

    const timer = window.setTimeout(() => {
      setShowSubmittedToast(false);
      navigate(location.pathname, { replace: true, state: null });
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [location.pathname, navigate, showSubmittedToast]);

  return (
    <section className="jobs-page">
      <header className="jobs-page__header">
        <button type="button" className="jobs-page__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          ‹
        </button>
        <h1>구인 목록</h1>
      </header>

      <div className="jobs-filter" aria-label="공고 정렬">
        <button type="button" className="jobs-filter__item jobs-filter__item--active">최신순</button>
        <button type="button" className="jobs-filter__item">거리순</button>
        <button type="button" className="jobs-filter__item">사례금 높은 순</button>
      </div>

      <div className="job-list">
        {studentJobs.map((job) => (
          <button
            key={job.id}
            type="button"
            className="job-card"
            onClick={() => navigate(`/student/jobs/${job.id}`)}
          >
            <span className="job-card__thumbnail" style={{ background: job.color }} aria-hidden="true">
              {job.storeName.slice(0, 1)}
            </span>
            <span className="job-card__content">
              <strong>{job.storeName}</strong>
              <span>{job.category}</span>
              <span>{job.reward} · {job.deadline}</span>
            </span>
            <span className="job-card__arrow">›</span>
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
