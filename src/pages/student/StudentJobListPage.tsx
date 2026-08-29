import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listJobPosts } from "../../api/jobPosts";
import { getApiErrorMessage } from "../../api/client";
import type { JobPostSummary } from "../../api/types";
import "./StudentJobs.css";
export default function StudentJobListPage() { const navigate = useNavigate(); const [jobs, setJobs] = useState<JobPostSummary[]>([]); const [error, setError] = useState<string | null>(null); useEffect(() => { listJobPosts().then((r) => setJobs(r.content)).catch((e) => setError(getApiErrorMessage(e, "공고를 불러오지 못했습니다."))); }, []); return <section className="jobs-page"><header className="jobs-page__header"><button type="button" className="jobs-page__back" onClick={() => navigate(-1)} aria-label="뒤로가기">‹</button><h1>구인 목록</h1></header>{error && <p>{error}</p>}<div className="job-list">{jobs.map((job) => <button key={job.jobPostId} type="button" className="job-card" onClick={() => navigate(`/student/jobs/${job.jobPostId}`)}><span className="job-card__thumbnail" aria-hidden="true">{job.title.slice(0, 1)}</span><span className="job-card__content"><strong>{job.title}</strong><span>{job.category}</span><span>{job.budget.toLocaleString()}원 · {job.deadline.slice(0, 10)}</span></span><span className="job-card__arrow">›</span></button>)}</div></section>; }
