import type { ReactNode } from "react";
import "./AuthFrame.css";

interface AuthFrameProps {
  title?: string;
  children: ReactNode;
}

export default function AuthFrame({ title, children }: AuthFrameProps) {
  return (
    <div className="auth-frame">
      {title && <h1 className="auth-frame__title">{title}</h1>}
      {children}
    </div>
  );
}
