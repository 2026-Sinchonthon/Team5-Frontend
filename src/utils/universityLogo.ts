import ewha from "../assets/design/school-logos/ewha.png";
import sogang from "../assets/design/school-logos/sogang.png";
import yonsei from "../assets/design/school-logos/yonsei.png";
import hongik from "../assets/design/school-logos/hongik.png";
import myongjiSeoul from "../assets/design/school-logos/myongji-seoul.png";

const UNIVERSITY_LOGOS: Record<string, string> = {
  "연세대학교": yonsei,
  "이화여자대학교": ewha,
  "서강대학교": sogang,
  "홍익대학교": hongik,
  "명지대학교(서울캠퍼스)": myongjiSeoul,
  "명지대학교 서울캠퍼스": myongjiSeoul,
};

export function getUniversityLogo(universityName: string | undefined | null): string | undefined {
  if (!universityName) return undefined;
  return UNIVERSITY_LOGOS[universityName];
}
