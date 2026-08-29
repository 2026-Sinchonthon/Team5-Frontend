import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import "./SplashPage.css";

const SPLASH_DURATION_MS = 2000;

export default function SplashPage() {
  const navigate = useNavigate();
  const { role } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/login/${role}`, { replace: true });
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [navigate, role]);

  return (
    <AuthFrame>
      <div className="splash-page__logo">
        사이트
        <br />
        로고
      </div>
      <p className="splash-page__welcome">Welcome to ~</p>
    </AuthFrame>
  );
}
