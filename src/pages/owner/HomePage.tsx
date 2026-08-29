import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="owner-home">
      <h1 className="owner-home__title">홈</h1>

      <div className="owner-home__profile">
        <div className="owner-home__avatar">
          학교
          <br />
          로고
        </div>
        <p className="owner-home__greeting">김신촌님, 환영합니다!</p>
        <div className="owner-home__bell" aria-label="알림">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </div>
      </div>

      <section className="owner-home__section">
        <h2>현재 매칭</h2>
        <p className="owner-home__restaurant-name">식당 이름</p>

        <div className="owner-home__matching-card">
          <div className="owner-home__matching-image">이미지</div>

          <div className="owner-home__matching-info">
            <div className="owner-home__deadline-row">
              <span>마감 기한까지</span>
              <strong>D-3</strong>
            </div>
            <div className="owner-home__progress">
              <div className="owner-home__progress-bar" />
            </div>
            <div className="owner-home__progress-dates">
              <span>8/12</span>
              <span>8/18</span>
            </div>
            <p className="owner-home__reward">사례금 | 100,000원</p>
            <button
              type="button"
              className="owner-home__chat-button"
              onClick={() => navigate("/owner/chat/1")}
            >
              채팅방 이동
            </button>
          </div>
        </div>
      </section>

      <section className="owner-home__section">
        <h2>최신 구인글</h2>
        <div className="owner-home__latest-post-placeholder" />
      </section>
    </div>
  );
}
