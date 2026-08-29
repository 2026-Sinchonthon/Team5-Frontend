import type { RouteObject } from "react-router-dom";
import StudentLoginPage from "../pages/auth/StudentLoginPage";
import StudentSignupPage from "../pages/auth/StudentSignupPage";
import StudentSplashPage from "../pages/auth/StudentSplashPage";
import StudentLayout from "../layouts/StudentLayout";
import StudentJobListPage from "../pages/student/StudentJobListPage";
import StudentJobDetailPage from "../pages/student/StudentJobDetailPage";
import StudentJobApplyPage from "../pages/student/StudentJobApplyPage";
import StudentChatPage from "../pages/student/StudentChatPage";
import StudentHomePage from "../pages/student/StudentHomePage";
import StudentMatchesPage from "../pages/student/StudentMatchesPage";
import StudentMyPage from "../pages/student/StudentMyPage";
import StudentMyPageEditPage from "../pages/student/StudentMyPageEditPage";
import RequireAuth from "../components/common/RequireAuth";

export const studentRoutes: RouteObject[] = [
  { path: "/login/student", element: <StudentLoginPage /> },
  { path: "/signup/student", element: <StudentSignupPage /> },
  { path: "/student/splash", element: <StudentSplashPage /> },
  {
    element: <RequireAuth role="STUDENT" />,
    children: [{
      path: "/student",
      element: <StudentLayout />,
      children: [
      { index: true, element: <StudentHomePage /> },
      { path: "jobs", element: <StudentJobListPage /> },
      { path: "jobs/:jobId", element: <StudentJobDetailPage /> },
      { path: "jobs/:jobId/apply", element: <StudentJobApplyPage /> },
      { path: "matches", element: <StudentMatchesPage /> },
      { path: "mypage", element: <StudentMyPage /> },
      { path: "mypage/edit", element: <StudentMyPageEditPage /> },
      { path: "chat/:roomId", element: <StudentChatPage /> },
      ],
    }],
  },
];
