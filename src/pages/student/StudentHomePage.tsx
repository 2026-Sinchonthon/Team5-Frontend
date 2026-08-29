import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentJobs } from "../../data/studentJobs";
import { getMyProfile } from "../../api/members";
import "./StudentPages.css";

export default function StudentHomePage() {
  const navigate = useNavigate();
  const activeJob = studentJobs[0];
  const latestJob = studentJobs[1];
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    getMyProfile()
      .then((profile) => setName(profile.name))
      .catch(() => setName(null));
  }, []);

  return (
    <section className="student-page student-home">
      <header className="student-home__header">
        <div className="student-home__identity">
          <div className="student-home__school">학교<br />로고</div>
          <p><strong>{name ?? "..."}</strong>님, 환영합니다!</p>
        </div>
        <button type="button" className="student-home__notice" aria-label="알림">♟</button>
      </header>

      <section className="student-home__active">
        <h1>진행 중인 ~</h1>
        <h2>{activeJob.storeName}</h2>
        <div className="student-home__active-content">
          <div className="student-home__active-image" style={{ background: activeJob.color }}>
            {activeJob.storeName[0]}
          </div>
          <div className="student-home__active-info">
            <div className="student-home__deadline">
              <strong>마감 기한까지</strong>
              <b>D - 3</b>
            </div>
            <div className="student-home__progress"><span /></div>
            <div className="student-home__progress-label"><span>8/12</span><span>8/18</span></div>
            <p>사례금 | <strong>{activeJob.reward}</strong></p>
            <button type="button" onClick={() => navigate("/student/matches")}>채팅방 이동</button>
          </div>
        </div>
      </section>

      <section className="student-home__latest">
        <div className="student-home__latest-heading">
          <h2>최신 구인글</h2>
          <button type="button" onClick={() => navigate("/student/jobs")}>전체보기 ›</button>
        </div>
        <button
          type="button"
          className="student-home__latest-card"
          style={{ background: latestJob.color }}
          onClick={() => navigate(`/student/jobs/${latestJob.id}`)}
          aria-label={`${latestJob.storeName} 공고 상세 보기`}
        >
          <span>{latestJob.storeName[0]}</span>
          <strong>{latestJob.storeName}</strong>
          <small>{latestJob.category} · {latestJob.reward}</small>
        </button>
      </section>
    </section>
  );
}
