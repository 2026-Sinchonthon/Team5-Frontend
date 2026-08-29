import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ProfileIcon } from "../../components/common/Icon";
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
          <ChevronLeftIcon />
        </button>
        <h1 className="my-page__title">마이페이지</h1>
      </div>

      <div className="my-page__avatar" aria-hidden="true">
        <ProfileIcon width={40} height={40} />
      </div>
      <p className="my-page__name">김사장</p>

      <ul className="my-page__menu">
        <li>
          <button
            type="button"
            className="my-page__menu-item"
            onClick={() => navigate("/owner/mypage/account")}
          >
            계정 정보
          </button>
        </li>
        <li>
          <button
            type="button"
            className="my-page__menu-item"
            onClick={() => navigate("/owner/mypage/posts")}
          >
            나의 게시글
          </button>
        </li>
      </ul>
    </div>
  );
}
