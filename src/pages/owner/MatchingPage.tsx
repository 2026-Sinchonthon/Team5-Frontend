import { useNavigate } from "react-router-dom";
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
        <p className="owner-home__restaurant-name">글 제목</p>

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
