import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import { login } from "../../api/auth";
import { getApiErrorMessage } from "../../api/client";
import { setAuthenticatedSession } from "../../api/token";
import "./StudentAuthForm.css";

export default function StudentLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: FormEvent) => { event.preventDefault(); setLoading(true); setError(null); try { const result = await login({ email, password }); setAuthenticatedSession(result.accessToken, result.member.role); navigate(result.member.role === "OWNER" ? "/owner/home" : "/student"); } catch (e) { setError(getApiErrorMessage(e, "이메일 또는 비밀번호가 올바르지 않습니다.")); } finally { setLoading(false); } };

  return (
    <AuthFrame title="로그인">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <div className="auth-field">
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력해주세요" required />
        </div>
        <div className="auth-field">
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요" required />
        </div>

        <div className="auth-actions">
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인 →"}
          </button>
        </div>
        {error && <p className="auth-error">{error}</p>}
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
