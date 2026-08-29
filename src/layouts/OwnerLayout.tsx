import { Outlet } from "react-router-dom";
import OwnerBottomNav from "../components/owner/OwnerBottomNav";
import "./OwnerLayout.css";

export default function OwnerLayout() {
  return (
    <div className="owner-layout">
      <div className="owner-layout__content">
        <Outlet />
      </div>
      <OwnerBottomNav />
    </div>
  );
}
