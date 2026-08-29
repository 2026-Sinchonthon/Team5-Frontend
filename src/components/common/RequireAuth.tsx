import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken, getMemberRole } from "../../api/token";
import type { MemberRole } from "../../api/types";

export default function RequireAuth({ role }: { role: MemberRole }) {
  const token = getAccessToken();
  const currentRole = getMemberRole();
  if (!token || !currentRole) return <Navigate to={`/login/${role.toLowerCase()}`} replace />;
  if (currentRole !== role) return <Navigate to={currentRole === "OWNER" ? "/owner/home" : "/student"} replace />;
  return <Outlet />;
}
