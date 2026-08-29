import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { studentJobs } from "../../data/studentJobs";
import "./StudentJobs.css";

export default function StudentJobApplyPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [introduction, setIntroduction] = useState("");
  const [imageName, setImageName] = useState("");
  const job = studentJobs.find((item) => item.id === Number(jobId));

  if (!job) {
    return (
      <section className="jobs-page jobs-page--empty">
        <p>신청할 공고를 찾을 수 없습니다.</p>
        <button type="button" onClick={() => navigate("/student/jobs")}>목록으로 돌아가기</button>
      </section>
    );
  }

  return (
    <section className="job-apply">
      <header className="job-apply__header">
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">‹</button>
        <h1>매칭 신청서 작성</h1>
        <span aria-hidden="true" />
      </header>

      <div className="job-apply__job">
        <div style={{ background: job.color }}>{job.storeName[0]}</div>
        <div>
          <strong>{job.storeName}</strong>
          <span>{job.category}</span>
        </div>
      </div>

      <form
        className="job-apply__form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/student/jobs", {
            replace: true,
            state: { matchingSubmitted: true },
          });
        }}
      >
        <label className="job-apply__introduction">
          <span><b>*</b> 이런 점이 잘 맞아요</span>
          <textarea
            value={introduction}
            onChange={(event) => setIntroduction(event.target.value)}
            placeholder="관련 경험과 내가 잘할 수 있는 부분을 간단히 소개해주세요."
            required
          />
        </label>

        <div className="job-apply__upload">
          <span>이미지 업로드</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(event) => setImageName(event.target.files?.[0]?.name ?? "")}
          />
          <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="이미지 첨부">
            {imageName ? <small>{imageName}</small> : <b>＋</b>}
          </button>
        </div>

        <button type="submit" className="job-apply__submit">
          매칭 신청 완료
        </button>
      </form>
    </section>
  );
}
