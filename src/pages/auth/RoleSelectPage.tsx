import { useNavigate } from "react-router-dom";
import AuthFrame from "../../components/common/AuthFrame";
import "./RoleSelectPage.css";

export default function RoleSelectPage() {
  const navigate = useNavigate();

  return (
    <AuthFrame>
      <div className="role-select__logo">
        사이트
        <br />
        로고
      </div>

      <p className="role-select__hint">아래 버튼을 눌러 선택해주세요.</p>

      <div className="role-select__buttons">
        <button
          type="button"
          className="role-select__button"
          onClick={() => navigate("/splash/owner")}
        >
          사장님
        </button>
        <button
          type="button"
          className="role-select__button"
          onClick={() => navigate("/login/student")}
        >
          학생
        </button>
      </div>
    </AuthFrame>
  );
}
