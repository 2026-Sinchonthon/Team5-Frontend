import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createJobPost } from "../../api/jobPosts";
import { getApiErrorMessage } from "../../api/client";
import {
  JOB_CATEGORY_OPTIONS,
  type JobPostCategory,
} from "../../constants/jobCategories";
import "./JobCreatePage.css";

export default function JobCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<JobPostCategory | null>(null);
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!category) {
      setErrorMessage("카테고리를 선택해주세요.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await createJobPost({
        title,
        description,
        category,
        budget: Number(budget),
        deadline: `${deadline}T23:59:59+09:00`,
        images,
      });
      navigate("/owner/jobs/new/processing");
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          "공고 등록에 실패했습니다. 잠시 후 다시 시도해주세요.",
        ),
      );
    } finally {
      setIsSubmitting(false);
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

      <form className="job-create__form" onSubmit={handleSubmit}>
        <label className="job-create__image-upload">
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(event) => setImages(Array.from(event.target.files ?? []))}
          />
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
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="job-create__field">
          <label htmlFor="description">자세한 설명</label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div className="job-create__field">
          <label>카테고리</label>
          <div className="job-create__category-options">
            {JOB_CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={
                  option.value === category
                    ? "job-create__category-option job-create__category-option--active"
                    : "job-create__category-option"
                }
                onClick={() => setCategory(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="job-create__field">
          <label htmlFor="deadline">마감 기한</label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            required
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
              onChange={(event) => setBudget(event.target.value)}
              required
            />
            <span>원</span>
          </div>
        </div>

        <div className="job-create__toggle-row">
          <span>포트폴리오 이미지 제출 필수로 받기</span>
          <label className="job-create__toggle">
            <input type="checkbox" />
            <span className="job-create__toggle-slider" />
          </label>
        </div>

        {errorMessage && <p className="job-create__error">{errorMessage}</p>}

        <button type="submit" className="job-create__submit" disabled={isSubmitting}>
          {isSubmitting ? "등록 중..." : "완료"}
        </button>
      </form>
    </div>
  );
}
