import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import "./AuthForm.css";

export default function Owner_LoginPage() {
  const navigate = useNavigate();
  const { role } = useParams();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(role === "owner" ? "/owner/home" : "/student/jobs");
  };

  return (
    <AuthFrame title="로그인">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" placeholder="이메일을 입력해주세요" />
        </div>
        <div className="auth-field">
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" placeholder="비밀번호를 입력하세요" />
        </div>

        <button type="submit" className="auth-submit">
          로그인 →
        </button>
        <button
          type="button"
          className="auth-switch"
          onClick={() => navigate(`/signup/${role}`)}
        >
          회원가입
        </button>
      </form>
    </AuthFrame>
  );
}
