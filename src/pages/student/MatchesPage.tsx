import { useNavigate } from "react-router-dom";
import { studentJobs } from "../../data/studentJobs";
import "./StudentPages.css";

export default function MatchesPage() {
  const navigate = useNavigate();
  const activeJob = studentJobs[0];
  const matchHistory = [
    { job: studentJobs[1], status: "매칭 신청 중" },
    { job: studentJobs[2], status: "제출 완료" },
    { job: studentJobs[3], status: "매칭 완료" },
  ];

  return (
    <section className="student-page matches-page">
      <section className="matches-current">
        <h1>진행 중인 매칭</h1>
        <h2>{activeJob.storeName}</h2>

        <div className="matches-current__content">
          <div className="matches-current__image" style={{ background: activeJob.color }}>
            {activeJob.storeName[0]}
          </div>
          <div className="matches-current__info">
            <div className="matches-current__deadline">
              <strong>마감 기한까지</strong>
              <b>D - 3</b>
            </div>
            <div className="matches-current__progress"><span /></div>
            <div className="matches-current__labels"><span>시작</span><span>마감</span></div>
            <p>사례금 <strong>{activeJob.reward}</strong></p>
            <button type="button" onClick={() => navigate("/student/chat/1")}>채팅방 이동</button>
          </div>
        </div>
      </section>

      <section className="match-history">
        <h2>매칭 내역</h2>
        <div className="match-history__list">
          {matchHistory.map(({ job, status }) => (
            <article className="match-history__item" key={job.id}>
              <div className="match-history__image" style={{ background: job.color }}>
                {job.storeName[0]}
              </div>
              <div className="match-history__content">
                <h3>{job.storeName}</h3>
                <span>{job.category}</span>
                <div className="match-history__status">{status}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
