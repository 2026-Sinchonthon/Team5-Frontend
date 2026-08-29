import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./JobsSearchPage.css";

const CATEGORIES = ["SNS 운영", "이미지 제작", "웹사이트 개발"];

export default function JobsSearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category"),
  );

  const toggleCategory = (category: string) => {
    setSelectedCategory((current) =>
      current === category ? null : category,
    );
  };

  const runSearch = () => {
    navigate(
      selectedCategory
        ? `/owner/jobs?category=${encodeURIComponent(selectedCategory)}`
        : "/owner/jobs",
    );
  };

  return (
    <div className="jobs-search">
      <button
        type="button"
        className="jobs-search__back"
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <div className="jobs-search__bar">
        {selectedCategory && (
          <span className="jobs-search__tag">
            {selectedCategory.replace(" ", "")}
            <button
              type="button"
              aria-label="필터 해제"
              onClick={() => setSelectedCategory(null)}
            >
              ×
            </button>
          </span>
        )}
        <button
          type="button"
          className="jobs-search__submit"
          aria-label="검색"
          onClick={runSearch}
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
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>

      <h2 className="jobs-search__heading">카테고리 필터</h2>
      <div className="jobs-search__categories">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={
              category === selectedCategory
                ? "jobs-search__category jobs-search__category--active"
                : "jobs-search__category"
            }
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
