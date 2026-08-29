import { createBrowserRouter } from "react-router-dom";
import RoleSelectPage from "../pages/auth/RoleSelectPage";
import OwnerSplashPage from "../pages/auth/OwnerSplashPage";
import OwnerLoginPage from "../pages/auth/OwnerLoginPage";
import OwnerSignupPage from "../pages/auth/OwnerSignupPage";
import { studentRoutes } from "./studentRoutes";
import RequireAuth from "./RequireAuth";
import OwnerLayout from "../layouts/OwnerLayout";
import OwnerHomePage from "../pages/owner/HomePage";
import OwnerJobsPage from "../pages/owner/JobsPage";
import JobsSearchPage from "../pages/owner/JobsSearchPage";
import JobCreatePage from "../pages/owner/JobCreatePage";
import JobProcessingPage from "../pages/owner/JobProcessingPage";
import JobEditPage from "../pages/owner/JobEditPage";
import JobDetailPage from "../pages/owner/JobDetailPage";
import JobCompletedPage from "../pages/owner/JobCompletedPage";
import ApplicantListPage from "../pages/owner/ApplicantListPage";
import OwnerMatchingPage from "../pages/owner/MatchingPage";
import OwnerMyPage from "../pages/owner/MyPage";
import AccountPage from "../pages/owner/AccountPage";
import MyPostsPage from "../pages/owner/MyPostsPage";
import OwnerChatPage from "../pages/owner/ChatPage";

export const router = createBrowserRouter([
  { path: "/", element: <RoleSelectPage /> },
  { path: "/splash/owner", element: <OwnerSplashPage /> },
  { path: "/login/owner", element: <OwnerLoginPage /> },
  { path: "/signup/owner", element: <OwnerSignupPage /> },

  ...studentRoutes,

  {
    element: <RequireAuth />,
    children: [
      { path: "/owner/jobs/search", element: <JobsSearchPage /> },
      { path: "/owner/jobs/new", element: <JobCreatePage /> },
      { path: "/owner/jobs/new/processing", element: <JobProcessingPage /> },
      { path: "/owner/jobs/:jobId", element: <JobDetailPage /> },
      { path: "/owner/jobs/:jobId/edit", element: <JobEditPage /> },
      { path: "/owner/jobs/:jobId/completed", element: <JobCompletedPage /> },
      { path: "/owner/mypage/account", element: <AccountPage /> },
      { path: "/owner/chat/:roomId", element: <OwnerChatPage /> },
      {
        path: "/owner",
        element: <OwnerLayout />,
        children: [
          { path: "home", element: <OwnerHomePage /> },
          { path: "jobs", element: <OwnerJobsPage /> },
          { path: "jobs/:jobId/applicants", element: <ApplicantListPage /> },
          { path: "matching", element: <OwnerMatchingPage /> },
          { path: "mypage", element: <OwnerMyPage /> },
          { path: "mypage/posts", element: <MyPostsPage /> },
        ],
      },
    ],
  },
]);
