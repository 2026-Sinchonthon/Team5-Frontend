import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JobProcessingPage.css";

const SPINNER_DOTS = 8;
const PROCESSING_DURATION_MS = 2000;

export default function JobProcessingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/owner/jobs", { replace: true, state: { justUploaded: true } });
    }, PROCESSING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="processing">
      <h1 className="processing__title">로딩</h1>

      <div className="processing__body">
        <div className="processing__spinner" role="status" aria-label="처리 중">
          {Array.from({ length: SPINNER_DOTS }).map((_, index) => (
            <span
              key={index}
              className="processing__spinner-dot"
              style={{
                transform: `rotate(${(360 / SPINNER_DOTS) * index}deg)`,
                animationDelay: `${-(SPINNER_DOTS - index) * (1 / SPINNER_DOTS)}s`,
              }}
            />
          ))}
        </div>
        <p className="processing__status">Processing...</p>
        <p className="processing__hint">작성하신 내용을 정리하고 있어요.</p>
      </div>
    </div>
  );
}
