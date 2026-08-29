import { useNavigate } from "react-router-dom";
import { studentJobs } from "../../data/studentJobs";
import jobHero from "../../assets/design/job-hero.png";
import "./StudentPages.css";

export default function StudentMatchesPage() {
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

        <button
          type="button"
          className="matches-current__card"
          style={{ backgroundImage: `url(${jobHero})` }}
          onClick={() => navigate("/student/chat/1")}
        >
          <div className="matches-current__overlay">
            <strong>{activeJob.storeName}</strong>
            <span>사례금 {activeJob.reward}</span>
          </div>
        </button>
        <button
          type="button"
          className="matches-current__chat"
          onClick={() => navigate("/student/chat/1")}
        >
          채팅방 이동
        </button>
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
