// 메인 메뉴 항목 목록
// screen 값은 Player 의 currentScreen 에 들어갈 이름이에요.
// (컴포넌트 파일에는 컴포넌트만 export 해야 저장 시 화면이 바로 갱신(Fast Refresh)돼서 따로 뺐어요)
export const MENU_ITEMS = [
  { label: '오늘 기록하기', screen: 'write' },
  { label: '기록 목록', screen: 'list' },
  { label: '달력', screen: 'calendar' },
  { label: '통계', screen: 'stats' },
];
