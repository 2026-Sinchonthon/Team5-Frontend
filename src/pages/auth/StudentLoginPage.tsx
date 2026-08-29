import { useNavigate } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import "./StudentAuthForm.css";

export default function StudentLoginPage() {
  const navigate = useNavigate();

  return (
    <AuthFrame title="로그인">
      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/student/splash");
        }}
      >
        <div className="auth-field">
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" placeholder="이메일을 입력해주세요" required />
        </div>
        <div className="auth-field">
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" placeholder="비밀번호를 입력하세요" required />
        </div>

        <div className="auth-actions">
          <button type="submit" className="auth-submit">
            로그인 →
          </button>
        </div>
        <button
          type="button"
          className="auth-switch"
          onClick={() => navigate("/signup/student")}
        >
          회원가입
        </button>
      </form>
    </AuthFrame>
  );
}
