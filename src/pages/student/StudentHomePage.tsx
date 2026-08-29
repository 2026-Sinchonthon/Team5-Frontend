import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentJobs } from "../../data/studentJobs";
import jobHero from "../../assets/design/job-hero.png";
import { BellIcon, ClockIcon, ProfileIcon } from "../../components/common/Icon";
import { getMyProfile } from "../../api/members";
import { getUniversityLogo } from "../../utils/universityLogo";
import "./StudentPages.css";

export default function StudentHomePage() {
  const navigate = useNavigate();
  const activeJob = studentJobs[0];
  const latestJobs = studentJobs.slice(1);
  const [name, setName] = useState<string | null>(null);
  const [universityName, setUniversityName] = useState<string | null>(null);

  useEffect(() => {
    getMyProfile()
      .then((profile) => {
        setName(profile.name);
        if ("universityName" in profile.profile) {
          setUniversityName(profile.profile.universityName);
        }
      })
      .catch(() => setName(null));
  }, []);

  const universityLogo = getUniversityLogo(universityName);

  return (
    <section className="student-page student-home">
      <header className="student-home__header">
        <div className="student-home__identity">
          {universityLogo ? (
            <img className="student-home__school" src={universityLogo} alt={universityName ?? "학교 로고"} />
          ) : (
            <span className="student-home__school student-home__school--placeholder" aria-hidden="true">
              <ProfileIcon width={20} height={20} />
            </span>
          )}
          <p>
            <strong>{name ?? "..."}</strong>님, 환영합니다!
          </p>
        </div>
        <button type="button" className="student-home__notice" aria-label="알림">
          <BellIcon width={18} height={18} />
        </button>
      </header>

      <section className="student-home__active">
        <h1>진행 중인 작업</h1>
        <button
          type="button"
          className="student-home__active-card"
          style={{ backgroundImage: `url(${jobHero})` }}
          onClick={() => navigate("/student/matches")}
        >
          <div className="student-home__active-card-overlay">
            <strong>{activeJob.storeName}</strong>
            <span>작업 기간 | 8/12 ~ 8/18</span>
            <div className="student-home__progress">
              <span style={{ width: "48%" }} />
            </div>
            <div className="student-home__deadline">
              <ClockIcon width={16} height={16} />
              <b>D-3</b>
            </div>
          </div>
        </button>
      </section>

      <section className="student-home__latest">
        <div className="student-home__latest-heading">
          <h2>최신 구인글</h2>
          <button type="button" onClick={() => navigate("/student/jobs")}>전체보기 ›</button>
        </div>
        <div className="student-home__latest-scroll">
          {latestJobs.map((job) => (
            <button
              key={job.id}
              type="button"
              className="student-home__latest-card"
              onClick={() => navigate(`/student/jobs/${job.id}`)}
            >
              <span className="student-home__latest-thumb" style={{ background: job.color }}>
                {job.storeName[0]}
              </span>
              <span className="student-home__latest-body">
                <strong>{job.storeName}</strong>
                <small>{job.category} · {job.reward}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
