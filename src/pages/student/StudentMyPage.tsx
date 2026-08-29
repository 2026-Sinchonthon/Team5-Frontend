import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../api/members";
import { clearAccessToken } from "../../api/token";
import { ChevronLeftIcon, ProfileIcon } from "../../components/common/Icon";
import "./StudentPages.css";

export default function StudentMyPage() {
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    getMyProfile()
      .then((profile) => setName(profile.name))
      .catch(() => setName(null));
  }, []);

  const handleLogout = () => {
    clearAccessToken();
    navigate("/");
  };

  return (
    <section className="student-page mypage-main">
      <header className="mypage-main__header">
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <ChevronLeftIcon />
        </button>
        <h1>마이페이지</h1>
        <span aria-hidden="true" />
      </header>

      <button
        type="button"
        className="mypage-main__avatar"
        onClick={() => navigate("/student/mypage/edit")}
        aria-label="계정 정보 수정"
      >
        <ProfileIcon width={40} height={40} />
      </button>
      <p className="mypage-main__name">{name ?? "..."}</p>

      <div className="mypage-main__menu">
        <button type="button" onClick={() => navigate("/student/mypage/edit")}>
          계정 정보
        </button>
        <button type="button">나의 포트폴리오 관리</button>
        <button type="button" onClick={handleLogout}>로그아웃</button>
      </div>
    </section>
  );
}
