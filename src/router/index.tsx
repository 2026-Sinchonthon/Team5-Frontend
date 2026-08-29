import { createBrowserRouter } from "react-router-dom";
import RoleSelectPage from "../pages/auth/RoleSelectPage";
import SplashPage from "../pages/auth/SplashPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import StudentLayout from "../layouts/StudentLayout";
import JobListPage from "../pages/student/JobListPage";
import JobDetailPage from "../pages/student/JobDetailPage";
import JobApplyPage from "../pages/student/JobApplyPage";
import StudentChatPage from "../pages/student/ChatPage";
import OwnerLayout from "../layouts/OwnerLayout";
import OwnerHomePage from "../pages/owner/HomePage";
import OwnerJobsPage from "../pages/owner/JobsPage";
import JobCreatePage from "../pages/owner/JobCreatePage";
import ApplicantListPage from "../pages/owner/ApplicantListPage";
import OwnerMatchingPage from "../pages/owner/MatchingPage";
import OwnerMyPage from "../pages/owner/MyPage";
import OwnerChatPage from "../pages/owner/ChatPage";

export const router = createBrowserRouter([
  { path: "/", element: <RoleSelectPage /> },
  { path: "/splash/:role", element: <SplashPage /> },
  { path: "/login/:role", element: <LoginPage /> },
  { path: "/signup/:role", element: <SignupPage /> },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      { path: "jobs", element: <JobListPage /> },
      { path: "jobs/:jobId", element: <JobDetailPage /> },
      { path: "jobs/:jobId/apply", element: <JobApplyPage /> },
      { path: "chat/:roomId", element: <StudentChatPage /> },
    ],
  },
  {
    path: "/owner",
    element: <OwnerLayout />,
    children: [
      { path: "home", element: <OwnerHomePage /> },
      { path: "jobs", element: <OwnerJobsPage /> },
      { path: "jobs/new", element: <JobCreatePage /> },
      { path: "jobs/:jobId/applicants", element: <ApplicantListPage /> },
      { path: "matching", element: <OwnerMatchingPage /> },
      { path: "mypage", element: <OwnerMyPage /> },
      { path: "chat/:roomId", element: <OwnerChatPage /> },
    ],
  },
]);
