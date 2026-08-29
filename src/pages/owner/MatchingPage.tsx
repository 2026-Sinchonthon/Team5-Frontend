import { useNavigate } from "react-router-dom";
import jobHero from "../../assets/design/job-hero.png";
import { ClockIcon } from "../../components/common/Icon";
import "./HomePage.css";
import "./MatchingPage.css";

const MATCHING_HISTORY = [
  { id: "1", title: "글 제목", status: "매칭 모집 중" },
  { id: "2", title: "글 제목", status: "제출 완료" },
  { id: "3", title: "글 제목", status: "제출 완료" },
];

export default function MatchingPage() {
  const navigate = useNavigate();

  return (
    <div className="matching-page">
      <section className="owner-home__section">
        <h2>진행 중인 매칭</h2>

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
        <h2>매칭 내역</h2>

        <ul className="matching-page__history">
          {MATCHING_HISTORY.map((item) => (
            <li key={item.id} className="matching-page__history-item">
              <div className="matching-page__history-image" />
              <div className="matching-page__history-info">
                <p className="matching-page__history-title">{item.title}</p>
                <span className="matching-page__history-status">
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
