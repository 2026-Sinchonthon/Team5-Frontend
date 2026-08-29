## 서비스 소개
본 서비스는 신촌 상권의 소상공인(사장님)들과 인근 대학 재학생들을 안전하고 효율적으로 연결해 주는 하이퍼로컬 맞춤형 외주 매칭 플랫폼입니다.
- **타겟층:**
    - **사장님:** 디지털 마케팅, 디자인, 웹 개발 지원이 필요한 신촌 소상공인
    - **학생:** 실무 경험과 수익 창출을 원하는 인근 대학생

## 기술 스택

| 분야 | 기술 |
|---|---|
| Frontend | React, TypeScript |
| Backend | Java 21, Spring Boot 4.1.1, Gradle |
| Database | H2 Database, MySQL |
| ORM | Spring Data JPA, Hibernate |
| Security | Spring Security, JWT |
| File Storage | AWS S3 SDK v2 |
| AI | Ollama, EXAONE 3.5 7.8B, Qwen 2.5 7B |
| API Documentation | Swagger UI, Springdoc OpenAPI 3.1.0 |
| Validation | Jakarta Bean Validation |
| Design | Figma |

## 팀원 소개

| 구분 | 담당자 | 담당 기능 | 주요 구현 내용 |
|---|---|---|---|
| Frontend | 박효정 | 학생 사용자 플로우 및 UI 구현 | 학생 온보딩, 홈, 일손 찾기, 공고 지원, 현재 매칭, 마이페이지 UI 구현 |
| Frontend | 이예원 | 점주 사용자 플로우 및 UI 구현 | 점주 온보딩, 공고 등록, 지원자 관리, 매칭 관리, 마이페이지 UI 구현 |
| Design / Planning | 정아인 | 기획 및 디자인 | 서비스 기획, 사용자 플로우 설계, 화면 UI/UX 디자인 |
| Backend | 오창엽 | 로그인 / 회원가입 / 마이페이지 | 학생·점주 회원가입, 대학 이메일 기반 학생 판별, JWT 로그인 및 인증, 회원·프로필 조회 |
| Backend | 조민준 | 공고 / LLM 공고 생성 | 공고 등록·조회·수정·취소, 공고 이미지 관리, 조건별 공고 검색, Ollama 기반 AI 공고 정제 |
| Backend | 주해윤 | 지원 / 매칭 / 결과물 / 수정 요청 | 공고 지원·수락, 매칭 생성, 결과물 제출·수정 요청·승인 |
