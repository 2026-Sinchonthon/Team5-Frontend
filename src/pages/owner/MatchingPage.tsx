import { useEffect, useState } from "react";
import { getMyMatchings } from "../../api/matchings";
import { getApiErrorMessage } from "../../api/client";
import type { MatchingSummary } from "../../api/types";
import "./HomePage.css"; import "./MatchingPage.css";
export default function MatchingPage() { const [matches, setMatches] = useState<MatchingSummary[]>([]); const [error, setError] = useState<string | null>(null); useEffect(() => { getMyMatchings().then(setMatches).catch((e) => setError(getApiErrorMessage(e, "매칭 내역을 불러오지 못했습니다."))); }, []); return <div className="matching-page"><section className="owner-home__section"><h2>매칭 내역</h2>{error && <p>{error}</p>}<ul className="matching-page__history">{matches.map((item) => <li key={item.matchingId} className="matching-page__history-item"><div className="matching-page__history-image">{item.jobPost.title[0]}</div><div className="matching-page__history-info"><p className="matching-page__history-title">{item.jobPost.title}</p><span className="matching-page__history-status">{item.status} · {item.agreedAmount.toLocaleString()}원</span></div></li>)}</ul></section></div>; }
