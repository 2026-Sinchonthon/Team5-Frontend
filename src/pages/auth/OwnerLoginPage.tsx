import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import { login } from "../../api/auth";
import { getApiErrorMessage } from "../../api/client";
import { setAccessToken } from "../../api/token";
import "./OwnerAuthForm.css";

export default function OwnerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const { accessToken } = await login({ email, password });
      setAccessToken(accessToken);
      navigate("/owner/home");
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          "이메일 또는 비밀번호가 올바르지 않습니다.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFrame title="로그인">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="auth-error">{errorMessage}</p>}

        <div className="auth-actions">
          <button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "로그인 중..." : "로그인 →"}
          </button>
        </div>
        <button
          type="button"
          className="auth-switch"
          onClick={() => navigate("/signup/owner")}
        >
          회원가입
        </button>
      </form>
    </AuthFrame>
  );
}
