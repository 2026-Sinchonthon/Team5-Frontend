import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import "./StudentSplashPage.css";

const SPLASH_DURATION_MS = 1800;

export default function StudentSplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate("/student", { replace: true });
    }, SPLASH_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <AuthFrame>
      <div className="splash-page__logo">
        학교
        <br />
        로고
      </div>
      <p className="splash-page__welcome">Welcome to ~</p>
    </AuthFrame>
  );
}
