import { NavLink, useNavigate } from "react-router-dom";
import "./OwnerBottomNav.css";

const NAV_ITEMS = [
  { label: "구인목록", path: "/owner/jobs" },
  { label: "홈", path: "/owner/home" },
  { label: "현재매칭", path: "/owner/matching" },
  { label: "마이페이지", path: "/owner/mypage" },
];

export default function OwnerBottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="owner-bottom-nav">
      <button
        type="button"
        className="owner-bottom-nav__write"
        onClick={() => navigate("/owner/jobs/new")}
      >
        작성
      </button>

      <ul className="owner-bottom-nav__list">
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "owner-bottom-nav__link owner-bottom-nav__link--active"
                  : "owner-bottom-nav__link"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
