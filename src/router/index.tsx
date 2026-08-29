import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import StudentLayout from "../layouts/StudentLayout";
import JobListPage from "../pages/student/JobListPage";
import JobDetailPage from "../pages/student/JobDetailPage";
import JobApplyPage from "../pages/student/JobApplyPage";
import StudentChatPage from "../pages/student/ChatPage";
import OwnerLayout from "../layouts/OwnerLayout";
import JobCreatePage from "../pages/owner/JobCreatePage";
import ApplicantListPage from "../pages/owner/ApplicantListPage";
import OwnerChatPage from "../pages/owner/ChatPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
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
      { path: "jobs/new", element: <JobCreatePage /> },
      { path: "jobs/:jobId/applicants", element: <ApplicantListPage /> },
      { path: "chat/:roomId", element: <OwnerChatPage /> },
    ],
  },
]);
