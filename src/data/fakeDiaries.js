// 기분 종류
// value 는 나중에 DB의 mood 컬럼(HAPPY, SAD, CALM ...)에 그대로 저장될 값이에요.
export const MOODS = [
  { value: 'HAPPY', label: '행복', icon: '☀' },
  { value: 'CALM', label: '평온', icon: '☁' },
  { value: 'SAD', label: '우울', icon: '☂' },
  { value: 'EXCITED', label: '신남', icon: '⚡' },
  { value: 'TIRED', label: '피곤', icon: '☾' },
];

// mood 값('HAPPY')으로 기분 정보({ label, icon })를 찾아주는 함수
export function findMood(value) {
  return MOODS.find((mood) => mood.value === value) ?? MOODS[0];
}

// 가짜 데이터 (백엔드가 생기기 전까지 사용)
// 필드 이름은 DB 테이블 컬럼과 1:1로 맞춰 두었어요.
//   song_title → songTitle, created_at → createdAt
// (자바/자바스크립트에서는 camelCase를 쓰는 게 관례라서 이렇게 바꿔 적어요)
export const fakeDiaries = [
  {
    id: 1,
    date: '2026-11-09',
    songTitle: 'Hype Boy',
    artist: 'NewJeans',
    mood: 'SAD',
    memo: '비 오는 월요일. 그래도 이 노래로 버팀',
    createdAt: '2026-11-09T21:30:00',
  },
  {
    id: 2,
    date: '2026-11-11',
    songTitle: 'Ditto',
    artist: 'NewJeans',
    mood: 'CALM',
    memo: '첫눈 올 것 같은 날씨. 버스에서 무한반복',
    createdAt: '2026-11-11T22:10:00',
  },
  {
    id: 3,
    date: '2026-11-12',
    songTitle: '밤양갱',
    artist: '비비',
    mood: 'HAPPY',
    memo: '부트캠프 첫 과제 제출 완료!',
    createdAt: '2026-11-12T23:05:00',
  },
  {
    id: 4,
    date: '2026-11-15',
    songTitle: '좋은 날',
    artist: '아이유',
    mood: 'TIRED',
    memo: '주말인데 에러 잡느라 하루 순삭',
    createdAt: '2026-11-15T20:40:00',
  },
  {
    id: 5,
    date: '2026-11-17',
    songTitle: 'APT.',
    artist: 'ROSÉ & Bruno Mars',
    mood: 'EXCITED',
    memo: 'MOODBOX 외형 완성 기념으로 신나게',
    createdAt: '2026-11-17T22:00:00',
  },
];
