import { useNavigate, useParams } from "react-router-dom";
import { studentJobs } from "../../data/studentJobs";
import "./Jobs.css";

export default function JobDetailPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = studentJobs.find((item) => item.id === Number(jobId));

  if (!job) {
    return (
      <section className="jobs-page jobs-page--empty">
        <p>공고를 찾을 수 없습니다.</p>
        <button type="button" onClick={() => navigate("/student/jobs")}>목록으로 돌아가기</button>
      </section>
    );
  }

  return (
    <article className="job-detail">
      <header className="job-detail__header">
        <button type="button" className="jobs-page__back" onClick={() => navigate(-1)} aria-label="뒤로가기">‹</button>
        <h1>{job.storeName}</h1>
        <span aria-hidden="true" />
      </header>

      <div className="job-detail__hero" style={{ background: job.color }}>
        <span>{job.storeName.slice(0, 1)}</span>
      </div>

      <div className="job-detail__body">
        <span className="job-detail__category">{job.category}</span>
        <section>
          <h2>사장님 요청 내용</h2>
          <p>{job.description}</p>
        </section>
        <dl className="job-detail__info">
          <div><dt>마감 기한</dt><dd>{job.deadline}</dd></div>
          <div><dt>사례금</dt><dd>{job.reward}</dd></div>
          <div><dt>매칭 현황</dt><dd>{job.matchStatus}</dd></div>
        </dl>
      </div>

      <button
        type="button"
        className="job-detail__apply"
        onClick={() => navigate(`/student/jobs/${job.id}/apply`)}
      >
        매칭 신청하기
      </button>
    </article>
  );
}
