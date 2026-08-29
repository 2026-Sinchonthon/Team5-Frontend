import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ChatIcon, HomeIcon, ListIcon, ProfileIcon } from "../components/common/Icon";
import "./StudentLayout.css";

export default function StudentLayout() {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith("/student/chat/");

  return (
    <div className="student-layout">
      <main className={`student-layout__content${isChatPage ? " student-layout__content--chat" : ""}`}>
        <Outlet />
      </main>

      {!isChatPage && <nav className="student-bottom-nav" aria-label="학생 메뉴">
        <NavLink to="/student/jobs" className="student-bottom-nav__item">
          <ListIcon />
          <span>구인 목록</span>
        </NavLink>
        <NavLink to="/student" end className="student-bottom-nav__item">
          <HomeIcon />
          <span>홈</span>
        </NavLink>
        <NavLink to="/student/matches" className="student-bottom-nav__item">
          <ChatIcon />
          <span>매칭 현황</span>
        </NavLink>
        <NavLink to="/student/mypage" className="student-bottom-nav__item">
          <ProfileIcon />
          <span>마이페이지</span>
        </NavLink>
      </nav>}
    </div>
  );
}
