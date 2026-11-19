// 백엔드(Spring Boot) 일기 API 를 호출하는 함수 모음
//
// 화면 컴포넌트에서 fetch 를 직접 쓰지 않고 여기 함수만 부르게 하면
//   1. 주소가 바뀌어도 이 파일만 고치면 돼요.
//   2. 컴포넌트 코드가 "무엇을 하는지"만 남아서 읽기 쉬워져요.
//
// 주소 앞에 http://localhost:8080 을 안 붙여도 되는 이유:
//   vite.config.js 의 프록시가 /api 로 시작하는 요청을 8080 으로 전달해주기 때문이에요.

const BASE_URL = '/api/diaries';

// 공통 요청 함수: fetch + 에러 확인 + JSON 변환을 한 번에
async function request(url, options) {
  const response = await fetch(url, options);

  // fetch 는 404, 500 같은 "실패 응답"이 와도 에러를 던지지 않아요! (네트워크가 끊겼을 때만 던짐)
  // 그래서 response.ok (상태 코드 200~299 인지)를 직접 확인해야 해요.
  if (!response.ok) {
    throw new Error(`요청 실패 (${response.status})`);
  }

  return response.json(); // 응답 body 의 JSON 글자를 자바스크립트 객체로 변환
}

// 기록 목록 (최신순) — GET /api/diaries
export function fetchDiaries() {
  return request(BASE_URL);
}

// 날짜로 찾기 — GET /api/diaries?date=2026-11-18
export function fetchDiariesByDate(date) {
  return request(`${BASE_URL}?date=${date}`);
}

// 기록 하나 보기 — GET /api/diaries/3
export function fetchDiary(id) {
  return request(`${BASE_URL}/${id}`);
}

// 기록 작성 — POST /api/diaries
// diary 예시: { date: '2026-11-19', songTitle: 'Ditto', artist: 'NewJeans', mood: 'CALM', memo: '...' }
export function createDiary(diary) {
  return request(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // "보내는 내용은 JSON 이에요" 라고 알려주기
    body: JSON.stringify(diary), // 자바스크립트 객체 → JSON 글자로 변환
  });
}
