export interface StudentJob {
  id: number;
  storeName: string;
  category: string;
  description: string;
  deadline: string;
  reward: string;
  matchStatus: string;
  color: string;
}

export const studentJobs: StudentJob[] = [
  {
    id: 1,
    storeName: "창천동 작은 식당",
    category: "이미지 제작",
    description: "가게 신메뉴 홍보용 포스터와 메뉴판 디자인",
    deadline: "9월 8일까지",
    reward: "150,000원",
    matchStatus: "지원자 3명",
    color: "#f3cdbb",
  },
  {
    id: 2,
    storeName: "신촌동 오늘의 카페",
    category: "인스타그램 운영",
    description: "매장 인스타그램 피드 기획과 촬영",
    deadline: "9월 12일까지",
    reward: "250,000원",
    matchStatus: "지원자 5명",
    color: "#c9d9ca",
  },
  {
    id: 3,
    storeName: "동교동 베이커리",
    category: "웹 개발",
    description: "메뉴와 매장 정보를 보여줄 간단한 소개 페이지",
    deadline: "9월 20일까지",
    reward: "400,000원",
    matchStatus: "지원자 2명",
    color: "#c9d5e4",
  },
  {
    id: 4,
    storeName: "이대 앞 소품샵",
    category: "이미지 제작",
    description: "가을 시즌 행사에 사용할 카드뉴스 디자인",
    deadline: "9월 15일까지",
    reward: "180,000원",
    matchStatus: "신규 공고",
    color: "#e7d6a9",
  },
];
