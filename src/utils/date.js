const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 오늘 날짜를 'YYYY-MM-DD' 형태로 돌려줘요.
// new Date().toISOString() 은 UTC(영국 시간) 기준이라
// 한국 오전 9시 전에는 날짜가 하루 전으로 나올 수 있어서 직접 만들어요.
export function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작!
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// '2026-11-18' → '11.18'
export function formatShortDate(dateString) {
  const [, month, day] = dateString.split('-');
  return `${month}.${day}`;
}

// '2026-11-18' → '2026.11.18 (수)'
export function formatLongDate(dateString) {
  const [year, month, day] = dateString.split('-');
  const dayOfWeek = DAYS[new Date(year, month - 1, day).getDay()];
  return `${year}.${month}.${day} (${dayOfWeek})`;
}
