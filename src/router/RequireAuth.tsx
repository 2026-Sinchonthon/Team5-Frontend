import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken } from "../api/token";

export default function RequireAuth() {
  const location = useLocation();
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
