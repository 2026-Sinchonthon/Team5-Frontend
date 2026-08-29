import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobCreatePage.css";
import "./AccountPage.css";

export default function AccountPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="job-create">
      <button
        type="button"
        className="job-create__back account-page__back"
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <div className="account-page__avatar" aria-hidden="true" />

      <form
        className="job-create__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="job-create__field">
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" defaultValue="2316020@ewhain.net" />
        </div>

        <div className="job-create__field">
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" defaultValue="1234567!" />
        </div>

        <div className="job-create__field">
          <label htmlFor="nickname">유저 네임</label>
          <input id="nickname" type="text" defaultValue="김사장" />
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
      </form>
    </div>
  );
}
