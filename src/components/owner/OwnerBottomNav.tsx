import { NavLink, useNavigate } from "react-router-dom";
import { ChatIcon, HomeIcon, ListIcon, PlusIcon, ProfileIcon } from "../common/Icon";
import "./OwnerBottomNav.css";

const NAV_ITEMS = [
  { label: "구인 목록", path: "/owner/jobs", Icon: ListIcon },
  { label: "홈", path: "/owner/home", Icon: HomeIcon },
  { label: "매칭 현황", path: "/owner/matching", Icon: ChatIcon },
  { label: "마이페이지", path: "/owner/mypage", Icon: ProfileIcon },
];

export default function OwnerBottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="owner-bottom-nav">
      <button
        type="button"
        className="owner-bottom-nav__write"
        aria-label="공고 작성"
        onClick={() => navigate("/owner/jobs/new")}
      >
        <PlusIcon width={22} height={22} />
      </button>

      <ul className="owner-bottom-nav__list">
        {NAV_ITEMS.map(({ label, path, Icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "owner-bottom-nav__link owner-bottom-nav__link--active"
                  : "owner-bottom-nav__link"
              }
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
