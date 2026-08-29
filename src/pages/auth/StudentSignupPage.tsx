import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import { signupStudent } from "../../api/auth";
import { getApiErrorMessage } from "../../api/client";
import "./StudentAuthForm.css";

export default function StudentSignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [passwordConfirm, setPasswordConfirm] = useState(""); const [name, setName] = useState(""); const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: FormEvent) => { event.preventDefault(); if (password !== passwordConfirm) { setError("비밀번호가 일치하지 않습니다."); return; } setLoading(true); setError(null); try { await signupStudent({ email, password, name }); navigate("/login/student"); } catch (e) { setError(getApiErrorMessage(e, "회원가입에 실패했습니다.")); } finally { setLoading(false); } };

  return (
    <AuthFrame title="회원가입">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <div className="auth-field">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="대학 이메일을 입력해주세요"
            value={email} onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password} onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="동일한 비밀번호를 입력하세요"
            value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="nickname">닉네임</label>
          <input id="nickname" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="닉네임을 입력하세요" required />
        </div>

        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? "가입 중..." : "회원가입 완료"}
        </button>
      </form>
    </AuthFrame>
  );
}
