import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteJobPost, getJobPost } from "../../api/jobPosts";
import { getApiErrorMessage } from "../../api/client";
import { jobCategoryLabel } from "../../constants/jobCategories";
import "./JobCreatePage.css";

export default function JobCompletedPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (!jobId) return;
    let cancelled = false;

    getJobPost(Number(jobId))
      .then((job) => {
        if (cancelled) return;
        setTitle(job.title);
        setDescription(job.description);
        setCategory(jobCategoryLabel(job.category));
        setDeadline(job.deadline.slice(0, 10));
        setBudget(String(job.budget));
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

  const handleDelete = async () => {
    if (!jobId) return;
    setErrorMessage(null);
    setIsDeleting(true);

    try {
      await deleteJobPost(Number(jobId));
      navigate("/owner/mypage/posts");
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          "삭제에 실패했습니다. 잠시 후 다시 시도해주세요.",
        ),
      );
    } finally {
      setIsDeleting(false);
    }
  };

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
        <h1 className="job-create__title">글 쓰기</h1>
      </div>

      {isLoading ? (
        <p className="job-create__error">불러오는 중...</p>
      ) : (
        <div className="job-create__form">
          <div className="job-create__image-upload" aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>

          <div className="job-create__field">
            <label htmlFor="title">글 제목</label>
            <input id="title" type="text" value={title} disabled readOnly />
          </div>

          <div className="job-create__field">
            <label htmlFor="description">자세한 설명</label>
            <textarea
              id="description"
              rows={5}
              value={description}
              disabled
              readOnly
            />
          </div>

          <div className="job-create__field">
            <label htmlFor="category">카테고리</label>
            <input id="category" type="text" value={category} disabled readOnly />
          </div>

          <div className="job-create__field">
            <label htmlFor="deadline">마감 기한</label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              disabled
              readOnly
            />
          </div>

          <div className="job-create__field">
            <label htmlFor="reward">사례금</label>
            <div className="job-create__input-with-suffix">
              <input
                id="reward"
                type="number"
                inputMode="numeric"
                value={budget}
                disabled
                readOnly
              />
              <span>원</span>
            </div>
          </div>

          <div className="job-create__toggle-row">
            <span>포트폴리오 이미지 제출 필수로 받기</span>
            <label className="job-create__toggle">
              <input type="checkbox" defaultChecked disabled />
              <span className="job-create__toggle-slider" />
            </label>
          </div>

          {errorMessage && (
            <p className="job-create__error">{errorMessage}</p>
          )}

          <button
            type="button"
            className="job-create__submit"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "삭제 중..." : "삭제하기"}
          </button>
        </div>
      )}
    </div>
  );
}
