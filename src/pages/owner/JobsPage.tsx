import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./JobsPage.css";

const SORT_OPTIONS = ["최신순", "거리순", "사례금 높은 순"];
const UPLOAD_TOAST_DURATION_MS = 2000;

const MOCK_JOBS = [
  { id: "1", name: "식당 이름" },
  { id: "2", name: "식당 이름" },
  { id: "3", name: "식당 이름" },
];

interface JobsPageLocationState {
  justUploaded?: boolean;
}

export default function JobsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [showUploadToast, setShowUploadToast] = useState(
    Boolean((location.state as JobsPageLocationState | null)?.justUploaded),
  );

  useEffect(() => {
    if (!showUploadToast) return;

    navigate(location.pathname, { replace: true, state: null });
    const timer = setTimeout(
      () => setShowUploadToast(false),
      UPLOAD_TOAST_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [showUploadToast]);

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

      <div className="owner-jobs__sort">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            className={
              option === selectedSort
                ? "owner-jobs__sort-option owner-jobs__sort-option--active"
                : "owner-jobs__sort-option"
            }
            onClick={() => setSelectedSort(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <ul className="owner-jobs__list">
        {MOCK_JOBS.map((job) => (
          <li key={job.id} className="owner-jobs__item">
            <div className="owner-jobs__thumbnail" />
            <p className="owner-jobs__name">{job.name}</p>
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
