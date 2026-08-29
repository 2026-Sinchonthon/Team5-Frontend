import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { studentJobs } from "../../data/studentJobs";
import { ChevronLeftIcon, ClockIcon, FilterIcon, SearchIcon } from "../../components/common/Icon";
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
              <span className="job-card__meta">
                <ClockIcon width={13} height={13} />
                {job.deadline}
              </span>
              <span className="job-card__reward">{job.reward}</span>
              <span className="job-card__category">{job.category}</span>
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
