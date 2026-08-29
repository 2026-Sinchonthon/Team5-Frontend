import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./JobsPage.css";

const UPLOAD_TOAST_DURATION_MS = 2000;

const MOCK_JOBS = [
  { id: "1", name: "식당 이름", category: "SNS 운영" },
  { id: "2", name: "식당 이름", category: "이미지 제작" },
  { id: "3", name: "식당 이름", category: "웹사이트 개발" },
  { id: "4", name: "식당 이름", category: "SNS 운영" },
];

interface JobsPageLocationState {
  justUploaded?: boolean;
}

export default function JobsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [showUploadToast, setShowUploadToast] = useState(
    Boolean((location.state as JobsPageLocationState | null)?.justUploaded),
  );

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

  const jobs = selectedCategory
    ? MOCK_JOBS.filter((job) => job.category === selectedCategory)
    : MOCK_JOBS;

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
          <span className="owner-jobs__filter-chip">{selectedCategory}</span>
        )}
      </div>

      <ul className="owner-jobs__list">
        {jobs.map((job) => {
          const isMine = job.id === "1";

          return (
            <li key={job.id}>
              <button
                type="button"
                className="owner-jobs__item"
                disabled={!isMine}
                onClick={
                  isMine
                    ? () => navigate(`/owner/jobs/${job.id}/edit`)
                    : undefined
                }
              >
                <div className="owner-jobs__thumbnail" />
                <p className="owner-jobs__name">{job.name}</p>
              </button>
            </li>
          );
        })}
      </ul>

      {showUploadToast && (
        <div className="owner-jobs__toast" role="status">
          게시글 업로드 완료!
        </div>
      )}
    </div>
  );
}
