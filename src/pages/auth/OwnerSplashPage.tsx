import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import "./OwnerSplashPage.css";

const SPLASH_DURATION_MS = 2000;

export default function OwnerSplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login/owner", { replace: true });
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

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
