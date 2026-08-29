import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAccessToken } from "../../api/token";
import { ChevronLeftIcon, ProfileIcon } from "../../components/common/Icon";
import "./JobCreatePage.css";
import "./AccountPage.css";

export default function AccountPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    clearAccessToken();
    navigate("/");
  };

  return (
    <div className="job-create">
      <button
        type="button"
        className="job-create__back account-page__back"
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
      >
        <ChevronLeftIcon />
      </button>

      <div className="account-page__avatar" aria-hidden="true">
        <ProfileIcon width={36} height={36} />
      </div>

      <form
        className="job-create__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="job-create__field">
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" defaultValue="2316020@ewhain.net" disabled={!isEditing} />
        </div>

        <div className="job-create__field">
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" defaultValue="1234567!" disabled={!isEditing} />
        </div>

        <div className="job-create__field">
          <label htmlFor="nickname">유저 네임</label>
          <input id="nickname" type="text" defaultValue="김사장" disabled={!isEditing} />
        </div>

        {isEditing ? (
          <button type="button" className="job-create__submit">
            완료
          </button>
        ) : (
          <button
            type="button"
            className="job-create__submit"
            onClick={() => setIsEditing(true)}
          >
            수정하기
          </button>
        )}

        <button
          type="button"
          className="job-create__submit account-page__logout"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </form>
    </div>
  );
}
