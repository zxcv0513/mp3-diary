# 📼 MOODBOX — 음악 일기장

> 날짜별로 **"오늘 들은 노래 + 그날의 기분/메모"** 를 기록하는 음악 일기장 웹사이트

실버 톤 Y2K 레트로 휴대용 음악 플레이어 **MOODBOX** 를 화면 속에 만들고,
기기의 작은 LCD 화면 안에서 메뉴를 이동하며 일기를 쓰고 읽을 수 있어요.

KT Cloud TECH UP 부트캠프 수강 중 진행하는 개인 포트폴리오 프로젝트입니다.

<!-- TODO: 스크린샷 / 동작 GIF 추가 -->

<br>

## ✨ 주요 기능

| 화면 | 설명 | 상태 |
|---|---|---|
| 메인 메뉴 | 오늘 기록하기 / 기록 목록 / 달력 / 통계 | ✅ |
| 오늘 기록하기 | 노래 제목, 아티스트, 기분(5종), 한 줄 메모 입력 | ✅ |
| 기록 목록 | 최신순으로 나열, 선택한 항목 자동 스크롤 | ✅ |
| Now Playing | 선택한 날의 노래·기분·메모를 재생 화면처럼 표시 (이퀄라이저, 흐르는 제목, 진행바, 이전/다음 곡) | ✅ |
| 달력 | 날짜를 고르면 그날 기록으로 이동 | ⬜ 예정 |
| 통계 | 많이 들은 아티스트, 기분 비율 | ⬜ 예정 |

### 🎮 조작법

화면의 버튼을 클릭하거나 키보드로 조작할 수 있어요.

| 버튼 | 키보드 | 동작 |
|---|---|---|
| ▲ ▼ | `↑` `↓` | 메뉴/목록 이동 |
| ◀ ▶ | `←` `→` | Now Playing 에서 이전/다음 기록 |
| OK | `Enter` | 선택 · 저장 · 재생/일시정지 |
| BACK | `Esc` `Backspace` | 뒤로 가기 |
| MENU | - | 메인 메뉴로 |

<br>

## 🎨 디자인 콘셉트

- **크롬 실버** 그라데이션의 둥근 세로형 몸체
- **하늘색 LCD** 화면 + 도트 폰트([DotGothic16](https://fonts.google.com/specimen/DotGothic16), 한글 지원) + 화면 줄무늬
- **무지갯빛 홀로그램 스티커** 띠 `✦ Y2K EDITION ✦`
- **십자 방향 버튼 + OK 버튼**, 하단 **MENU / BACK** 알약 버튼
- 특정 실제 제품을 복제하지 않은 오리지널 디자인

<br>

## 🛠 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React 19, Vite 8, CSS |
| Backend | Java 21, Spring Boot 4.1, Spring Data JPA, Lombok |
| Database | H2 (개발용 메모리 DB) → MySQL 예정 |
| Test | JUnit 5, AssertJ, `@DataJpaTest` |
| Lint / Build | Oxlint, Gradle |

<br>

## 📁 프로젝트 구조

```
mp3-diary
├─ src/                          # 프론트엔드 (React)
│  ├─ Player.jsx                 # 기기 몸체 + 상태 관리 + 버튼/키보드 로직
│  ├─ Player.css                 # 기기 스타일 전체
│  ├─ components/
│  │  ├─ Screen.jsx              # LCD 화면 틀
│  │  ├─ MainMenu.jsx
│  │  ├─ DiaryForm.jsx           # 오늘 기록하기
│  │  ├─ DiaryList.jsx           # 기록 목록
│  │  ├─ NowPlaying.jsx          # 기록 상세
│  │  ├─ ComingSoon.jsx          # 준비 중 화면
│  │  └─ ControlWheel.jsx        # 십자 버튼 + OK + MENU/BACK
│  ├─ data/                      # 가짜 데이터, 메뉴 목록
│  └─ utils/date.js
│
└─ backend/                      # 백엔드 (Spring Boot)
   └─ src/main/java/com/example/musicdiary/
      ├─ controller/DiaryController.java
      ├─ service/DiaryService.java
      ├─ repository/DiaryRepository.java
      ├─ entity/Diary.java, Mood.java
      └─ dto/DiaryRequest.java, DiaryResponse.java
```

<br>

## 🚀 실행 방법

### Frontend

```bash
npm install
npm run dev
```

→ http://localhost:5173

### Backend

> Java 21 이 필요해요.

```bash
cd backend
./gradlew bootRun
```

→ http://localhost:8080

- H2 콘솔: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:musicdiary` / User: `sa` / Password: (비움)
- 테스트 실행: `./gradlew test`

<br>

## 📡 API

| 기능 | 메서드 | 주소 | 상태 |
|---|---|---|---|
| 기록 목록 (최신순) | `GET` | `/api/diaries` | ✅ |
| 날짜로 찾기 | `GET` | `/api/diaries?date=2026-11-18` | ✅ |
| 기록 하나 보기 | `GET` | `/api/diaries/{id}` | ✅ |
| 기록 작성 | `POST` | `/api/diaries` | ✅ |
| 기록 수정 | `PUT` | `/api/diaries/{id}` | ⬜ |
| 기록 삭제 | `DELETE` | `/api/diaries/{id}` | ⬜ |

<details>
<summary>요청 / 응답 예시</summary>

**`POST /api/diaries`** → `201 Created`

```json
// Request
{
  "date": "2026-11-17",
  "songTitle": "APT.",
  "artist": "ROSÉ & Bruno Mars",
  "mood": "EXCITED",
  "memo": "MOODBOX 외형 완성"
}

// Response
{
  "id": 1,
  "date": "2026-11-17",
  "songTitle": "APT.",
  "artist": "ROSÉ & Bruno Mars",
  "mood": "EXCITED",
  "memo": "MOODBOX 외형 완성",
  "createdAt": "2026-11-19T14:55:38.255823"
}
```

`mood` 값: `HAPPY` · `CALM` · `SAD` · `EXCITED` · `TIRED`

</details>

<br>

## 🗄 DB 테이블

**diary**

| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | BIGINT (PK) | 자동 증가 |
| date | DATE | 기록 날짜 |
| song_title | VARCHAR(100) | 노래 제목 |
| artist | VARCHAR(100) | 아티스트 |
| mood | ENUM | 기분 (HAPPY, CALM, SAD, EXCITED, TIRED) |
| memo | TEXT | 한 줄 메모 |
| created_at | DATETIME | 작성 시간 |

<br>

## 🗺 개발 로드맵

- [x] 기기 외형 — HTML/CSS 로 몸체, 화면, 버튼
- [x] 메뉴 이동 — 버튼과 키보드로 메뉴 선택 · 화면 전환
- [x] 가짜 데이터로 화면 완성 — 기록 목록 · Now Playing · 기록하기
- [ ] Spring Boot API
  - [x] Entity · Repository · Service · DTO · Controller
  - [x] 작성 / 목록 / 상세 / 날짜 검색 API
  - [ ] 수정 / 삭제 API
  - [ ] 입력값 검증, 예외 처리 (404)
  - [ ] MySQL 연결
- [ ] 프론트-백 연결 (fetch)
- [ ] 달력 → 통계
- [ ] 클라우드 배포

<br>

## 📝 개발 기록

개발 과정을 velog 에 단계별로 정리하고 있어요.

<!-- TODO: velog 링크 추가 -->
