import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import { login, signupOwner } from "../../api/auth";
import { getApiErrorMessage } from "../../api/client";
import { setAccessToken } from "../../api/token";
import "./OwnerAuthForm.css";

export default function OwnerSignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await signupOwner({
        email,
        password,
        name: nickname,
        businessName,
      });
      const { accessToken } = await login({ email, password });
      setAccessToken(accessToken);
      navigate("/owner/home");
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFrame title="회원가입">
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
        <div className="auth-field">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="동일한 비밀번호를 입력하세요"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="businessName">매장명</label>
          <input
            id="businessName"
            type="text"
            placeholder="매장 이름을 입력하세요"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="auth-error">{errorMessage}</p>}

        <button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "가입 중..." : "회원가입 완료"}
        </button>
      </form>
    </AuthFrame>
  );
}
