import { createBrowserRouter } from "react-router-dom";
import RoleSelectPage from "../pages/auth/RoleSelectPage";
import OwnerSplashPage from "../pages/auth/OwnerSplashPage";
import OwnerLoginPage from "../pages/auth/OwnerLoginPage";
import OwnerSignupPage from "../pages/auth/OwnerSignupPage";
import { studentRoutes } from "./studentRoutes";
import OwnerLayout from "../layouts/OwnerLayout";
import JobCreatePage from "../pages/owner/JobCreatePage";
import ApplicantListPage from "../pages/owner/ApplicantListPage";
import OwnerChatPage from "../pages/owner/ChatPage";

export const router = createBrowserRouter([
  { path: "/", element: <RoleSelectPage /> },
  { path: "/splash/owner", element: <OwnerSplashPage /> },
  { path: "/login/owner", element: <OwnerLoginPage /> },
  { path: "/signup/owner", element: <OwnerSignupPage /> },
  ...studentRoutes,
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
