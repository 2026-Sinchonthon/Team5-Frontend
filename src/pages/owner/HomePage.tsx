import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import schoolLogo from "../../assets/design/school-logo.png";
import jobHero from "../../assets/design/job-hero.png";
import { BellIcon, ClockIcon } from "../../components/common/Icon";
import { getMyProfile } from "../../api/members";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    getMyProfile()
      .then((profile) => setName(profile.name))
      .catch(() => setName(null));
  }, []);

  return (
    <div className="owner-home">
      <header className="owner-home__header">
        <div className="owner-home__identity">
          <img className="owner-home__avatar" src={schoolLogo} alt="사이트 로고" />
          <p className="owner-home__greeting">
            <strong>{name ?? "..."}</strong>님, 환영합니다!
          </p>
        </div>
        <button type="button" className="owner-home__bell" aria-label="알림">
          <BellIcon width={18} height={18} />
        </button>
      </header>

      <section className="owner-home__section">
        <h2>진행 중인 작업</h2>

        <button
          type="button"
          className="owner-home__matching-card"
          style={{ backgroundImage: `url(${jobHero})` }}
          onClick={() => navigate("/owner/chat/1")}
        >
          <div className="owner-home__matching-overlay">
            <strong>와플잇업 웹사이트 제작</strong>
            <span>작업 기간 | 8/12 ~ 8/18</span>
            <div className="owner-home__progress">
              <span style={{ width: "48%" }} />
            </div>
            <div className="owner-home__deadline">
              <ClockIcon width={16} height={16} />
              <b>D-3</b>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="owner-home__chat-button"
          onClick={() => navigate("/owner/chat/1")}
        >
          채팅방 이동
        </button>
      </section>

      <section className="owner-home__section">
        <h2>최신 구인글</h2>
        <div className="owner-home__latest-post-placeholder" />
      </section>
    </div>
  );
}
