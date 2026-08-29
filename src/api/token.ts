const ACCESS_TOKEN_KEY = "accessToken";
const MEMBER_ROLE_KEY = "memberRole";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function setAuthenticatedSession(token: string, role: "STUDENT" | "OWNER"): void {
  setAccessToken(token);
  localStorage.setItem(MEMBER_ROLE_KEY, role);
}

export function getMemberRole(): "STUDENT" | "OWNER" | null {
  const role = localStorage.getItem(MEMBER_ROLE_KEY);
  return role === "STUDENT" || role === "OWNER" ? role : null;
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(MEMBER_ROLE_KEY);
}
