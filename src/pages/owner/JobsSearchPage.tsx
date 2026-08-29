import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeftIcon, SearchIcon } from "../../components/common/Icon";
import {
  JOB_CATEGORY_OPTIONS,
  jobCategoryLabel,
  type JobPostCategory,
} from "../../constants/jobCategories";
import "./JobsSearchPage.css";

export default function JobsSearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] =
    useState<JobPostCategory | null>(
      searchParams.get("category") as JobPostCategory | null,
    );

  const toggleCategory = (category: JobPostCategory) => {
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
        <ChevronLeftIcon />
      </button>

      <div className="jobs-search__bar">
        {selectedCategory && (
          <span className="jobs-search__tag">
            {jobCategoryLabel(selectedCategory).replace(" ", "")}
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
          <SearchIcon width={16} height={16} />
        </button>
      </div>

      <h2 className="jobs-search__heading">카테고리 필터</h2>
      <div className="jobs-search__categories">
        {JOB_CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={
              option.value === selectedCategory
                ? "jobs-search__category jobs-search__category--active"
                : "jobs-search__category"
            }
            onClick={() => toggleCategory(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
