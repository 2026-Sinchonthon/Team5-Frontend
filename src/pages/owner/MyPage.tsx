import { useNavigate } from "react-router-dom";
import "./MyPage.css";

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <div className="my-page">
      <div className="my-page__header">
        <button
          type="button"
          className="my-page__back"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h1 className="my-page__title">마이페이지</h1>
      </div>

      <div className="my-page__avatar" aria-hidden="true">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </div>
      <p className="my-page__name">김사장</p>

      <ul className="my-page__menu">
        <li>
          <button
            type="button"
            className="my-page__menu-item"
            onClick={() => navigate("/owner/mypage/account")}
          >
            <span className="my-page__menu-icon" />
            계정 정보
          </button>
        </li>
        <li>
          <button
            type="button"
            className="my-page__menu-item"
            onClick={() => navigate("/owner/mypage/posts")}
          >
            <span className="my-page__menu-icon" />
            나의 게시글
          </button>
        </li>
      </ul>
    </div>
  );
}
