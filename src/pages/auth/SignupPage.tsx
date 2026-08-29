import AuthFrame from "../../components/common/AuthFrame";
import "./AuthForm.css";

export default function SignupPage() {
  return (
    <AuthFrame title="회원가입">
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="auth-field">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="학교 이메일로 입력해주세요"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="동일한 비밀번호를 입력하세요"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="nickname">닉네임</label>
          <input id="nickname" type="text" placeholder="닉네임을 입력하세요" />
        </div>

        <button type="submit" className="auth-submit">
          회원가입 완료
        </button>
      </form>
    </AuthFrame>
  );
}
