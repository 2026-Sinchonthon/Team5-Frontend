import { createBrowserRouter } from "react-router-dom";
import RoleSelectPage from "../pages/auth/RoleSelectPage";
import SplashPage from "../pages/auth/SplashPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import StudentSplashPage from "../pages/auth/StudentSplashPage";
import StudentLayout from "../layouts/StudentLayout";
import JobListPage from "../pages/student/JobListPage";
import JobDetailPage from "../pages/student/JobDetailPage";
import JobApplyPage from "../pages/student/JobApplyPage";
import StudentChatPage from "../pages/student/ChatPage";
import StudentHomePage from "../pages/student/HomePage";
import StudentMatchesPage from "../pages/student/MatchesPage";
import StudentMyPage from "../pages/student/MyPage";
import StudentMyPageEditPage from "../pages/student/MyPageEditPage";
import OwnerLayout from "../layouts/OwnerLayout";
import JobCreatePage from "../pages/owner/JobCreatePage";
import ApplicantListPage from "../pages/owner/ApplicantListPage";
import OwnerChatPage from "../pages/owner/ChatPage";

export const router = createBrowserRouter([
  { path: "/", element: <RoleSelectPage /> },
  { path: "/splash/:role", element: <SplashPage /> },
  { path: "/login/:role", element: <LoginPage /> },
  { path: "/signup/:role", element: <SignupPage /> },
  { path: "/student/splash", element: <StudentSplashPage /> },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      { index: true, element: <StudentHomePage /> },
      { path: "jobs", element: <JobListPage /> },
      { path: "jobs/:jobId", element: <JobDetailPage /> },
      { path: "jobs/:jobId/apply", element: <JobApplyPage /> },
      { path: "matches", element: <StudentMatchesPage /> },
      { path: "mypage", element: <StudentMyPage /> },
      { path: "mypage/edit", element: <StudentMyPageEditPage /> },
      { path: "chat/:roomId", element: <StudentChatPage /> },
    ],
  },
  {
    path: "/owner",
    element: <OwnerLayout />,
    children: [
      { path: "jobs/new", element: <JobCreatePage /> },
      { path: "jobs/:jobId/applicants", element: <ApplicantListPage /> },
      { path: "chat/:roomId", element: <OwnerChatPage /> },
    ],
  },
]);
