import { useNavigate, useParams } from "react-router-dom";
import { studentJobs } from "../../data/studentJobs";
import jobHero from "../../assets/design/job-hero.png";
import { ChevronLeftIcon } from "../../components/common/Icon";
import "./StudentJobs.css";

export default function StudentJobDetailPage() {
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
      <button type="button" className="job-detail__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
        <ChevronLeftIcon />
      </button>

      <h1>{job.storeName}</h1>

      <div className="job-detail__hero" style={{ backgroundImage: `url(${jobHero})` }} />

      <div className="job-detail__price-row">
        <strong>사례금</strong>
        <span>{job.reward}</span>
      </div>
      <p className="job-detail__deadline-row">
        <strong>마감 기한</strong> | {job.deadline}
      </p>

      <hr className="job-detail__divider" />

      <p className="job-detail__description">{job.description}</p>

      <hr className="job-detail__divider" />

      <div className="job-detail__status-row">
        <strong>매칭 현황</strong>
        <span>{job.matchStatus}</span>
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
