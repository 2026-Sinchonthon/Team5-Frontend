import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <h1 className="login-page__title">로그인</h1>

      <div className="login-page__logo">로고</div>

      <p className="login-page__hint">아래 버튼을 눌러 선택해주세요.</p>

      <div className="login-page__buttons">
        <button
          type="button"
          className="login-page__button"
          onClick={() => navigate("/owner/jobs/new")}
        >
          사장님
        </button>
        <button
          type="button"
          className="login-page__button"
          onClick={() => navigate("/student/jobs")}
        >
          학생
        </button>
      </div>
    </div>
  );
}
