import { useNavigate } from "react-router-dom";
import { clearAccessToken } from "../../api/token";
import "./StudentPages.css";

export default function StudentMyPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/");
  };
  const savedProfile = localStorage.getItem("studentProfile");
  const nickname = savedProfile
    ? (JSON.parse(savedProfile) as { nickname?: string }).nickname ?? "김신촌"
    : "김신촌";

  return (
    <section className="student-page mypage">
      <header className="mypage__header">
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">‹</button>
        <h1>마이페이지</h1>
      </header>

      <button type="button" className="mypage__profile" onClick={() => navigate("/student/mypage/edit") }>
        <div className="mypage__avatar">♟</div>
        <strong>{nickname}</strong>
      </button>

      <div className="mypage__menu">
        <button type="button" onClick={() => navigate("/student/mypage/edit")}>
          <span className="mypage__menu-icon">■</span>
          <span>계정 정보</span>
          <b>›</b>
        </button>
        <button type="button">
          <span className="mypage__menu-icon">□</span>
          <span>나의 포트폴리오 관리</span>
          <b>›</b>
        </button>
        <button type="button" onClick={handleLogout}>
          <span className="mypage__menu-icon">⏻</span>
          <span>로그아웃</span>
          <b>›</b>
        </button>
      </div>

    </section>
  );
}
