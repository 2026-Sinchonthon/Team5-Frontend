import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ProfileIcon } from "../../components/common/Icon";
import "./StudentPages.css";

interface StudentProfile {
  email: string;
  password: string;
  nickname: string;
}

const initialProfile: StudentProfile = {
  email: "2316020@ewhain.net",
  password: "1234567!",
  nickname: "김신촌",
};

function loadProfile(): StudentProfile {
  const savedProfile = localStorage.getItem("studentProfile");
  return savedProfile ? JSON.parse(savedProfile) as StudentProfile : initialProfile;
}

export default function StudentMyPageEditPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>(loadProfile);

  const updateProfile = (field: keyof StudentProfile, value: string) => {
    setProfile((currentProfile) => ({ ...currentProfile, [field]: value }));
  };

  return (
    <section className="student-page mypage">
      <header className="mypage__header">
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <ChevronLeftIcon />
        </button>
        <h1>계정 정보 수정</h1>
        <span aria-hidden="true" />
      </header>

      <div className="mypage__avatar">
        <ProfileIcon width={40} height={40} />
      </div>

      <form
        className="mypage__form"
        onSubmit={(event) => {
          event.preventDefault();

          if (!isEditing) {
            setIsEditing(true);
            return;
          }

          localStorage.setItem("studentProfile", JSON.stringify(profile));
          setIsEditing(false);
        }}
      >
        <label>
          <span>이메일</span>
          <input
            type="email"
            value={profile.email}
            disabled={!isEditing}
            onChange={(event) => updateProfile("email", event.target.value)}
          />
        </label>
        <label>
          <span>비밀번호</span>
          <input
            type="password"
            value={profile.password}
            disabled={!isEditing}
            onChange={(event) => updateProfile("password", event.target.value)}
          />
        </label>
        <label>
          <span>유저 닉네임</span>
          <input
            type="text"
            value={profile.nickname}
            disabled={!isEditing}
            onChange={(event) => updateProfile("nickname", event.target.value)}
          />
        </label>

        <button type="submit">{isEditing ? "완료" : "수정하기"}</button>
      </form>
    </section>
  );
}
