import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobCreatePage.css";
import "./JobEditPage.css";

export default function JobEditPage() {
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);

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

      <form
        className="job-create__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="job-create__image-upload">
          <input type="file" accept="image/*" hidden />
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
        </label>

        <div className="job-create__field">
          <label htmlFor="title">글 제목</label>
          <input id="title" type="text" />
        </div>

        <div className="job-create__field">
          <label htmlFor="description">자세한 설명</label>
          <textarea id="description" rows={5} />
        </div>

        <div className="job-create__field">
          <label htmlFor="deadline">마감 기한</label>
          <input id="deadline" type="date" />
        </div>

        <div className="job-create__field">
          <label htmlFor="reward">사례금</label>
          <div className="job-create__input-with-suffix">
            <input id="reward" type="number" inputMode="numeric" />
            <span>원</span>
          </div>
        </div>

        <div className="job-create__toggle-row">
          <span>포트폴리오 이미지 제출 필수로 받기</span>
          <label className="job-create__toggle">
            <input type="checkbox" defaultChecked />
            <span className="job-create__toggle-slider" />
          </label>
        </div>

        {isConfirming ? (
          <div className="job-edit__confirm-buttons">
            <button type="button" className="job-edit__delete">
              삭제
            </button>
            <button type="button" className="job-create__submit">
              완료
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="job-create__submit"
            onClick={() => setIsConfirming(true)}
          >
            수정하기
          </button>
        )}
      </form>
    </div>
  );
}
