import { useEffect, useRef, useState } from 'react';
import './Player.css';
import { fakeDiaries } from './data/fakeDiaries';
import { getToday } from './utils/date';
import Screen from './components/Screen';
import { MENU_ITEMS } from './data/menuItems';
import MainMenu from './components/MainMenu';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import NowPlaying from './components/NowPlaying';
import ComingSoon from './components/ComingSoon';
import ControlWheel from './components/ControlWheel';

// 화면 이름 → 상태바에 보여줄 제목
const SCREEN_TITLES = {
  menu: 'MOODBOX',
  write: 'WRITE',
  list: 'DIARY',
  detail: 'NOW PLAYING',
  calendar: 'CALENDAR',
  stats: 'STATS',
};

export default function Player() {
  // ===== 상태(state) =====
  const [currentScreen, setCurrentScreen] = useState('menu'); // 지금 보여줄 화면
  const [selectedIndex, setSelectedIndex] = useState(0); // 메뉴/목록에서 선택된 위치
  const [diaries, setDiaries] = useState(fakeDiaries); // 기록 목록 (지금은 가짜 데이터)
  const [selectedDiary, setSelectedDiary] = useState(null); // 상세 화면에 보여줄 기록
  const [isPlaying, setIsPlaying] = useState(true); // Now Playing 재생/일시정지

  // 기기의 OK 버튼으로 DiaryForm 을 제출하기 위한 연결 고리
  const formRef = useRef(null);

  // 최신순 정렬 (날짜가 같으면 나중에 쓴 것(id가 큰 것)이 위로)
  // 원본 배열을 건드리지 않도록 [...diaries] 로 복사한 뒤 정렬해요.
  const sortedDiaries = [...diaries].sort(
    (a, b) => b.date.localeCompare(a.date) || b.id - a.id,
  );

  // ===== 화면 이동 도우미 함수 =====
  function goTo(screen, index = 0) {
    setCurrentScreen(screen);
    setSelectedIndex(index);
  }

  // 메뉴로 돌아갈 때, 방금 있던 메뉴 항목에 커서를 둬요.
  function goToMenu(fromScreen) {
    const index = MENU_ITEMS.findIndex((item) => item.screen === fromScreen);
    goTo('menu', Math.max(index, 0)); // 못 찾으면(-1) 0번으로
  }

  // 메뉴 항목 열기 (OK 버튼 / 마우스 클릭 둘 다 이 함수 사용)
  function openMenuItem(index) {
    goTo(MENU_ITEMS[index].screen);
  }

  // 목록에서 기록 열기
  function openDiary(index) {
    const diary = sortedDiaries[index];
    if (!diary) return;
    setSelectedIndex(index);
    setSelectedDiary(diary);
    setIsPlaying(true);
    setCurrentScreen('detail');
  }

  // 상세 화면에서 이전/다음 기록으로 (step: -1 또는 +1)
  function moveDiary(step) {
    const index = sortedDiaries.findIndex((d) => d.id === selectedDiary.id);
    const next = sortedDiaries[index + step];
    if (next) setSelectedDiary(next);
  }

  // 지금 화면에서 위아래로 고를 수 있는 항목 개수
  function getItemCount() {
    if (currentScreen === 'menu') return MENU_ITEMS.length;
    if (currentScreen === 'list') return sortedDiaries.length;
    return 0;
  }

  // ===== 버튼별 동작 =====
  function handleUp() {
    if (getItemCount() > 0) setSelectedIndex((i) => Math.max(i - 1, 0));
  }

  function handleDown() {
    const count = getItemCount();
    if (count > 0) setSelectedIndex((i) => Math.min(i + 1, count - 1));
  }

  function handleLeft() {
    if (currentScreen === 'detail') moveDiary(-1);
  }

  function handleRight() {
    if (currentScreen === 'detail') moveDiary(1);
  }

  function handleOk() {
    if (currentScreen === 'menu') openMenuItem(selectedIndex);
    else if (currentScreen === 'list') openDiary(selectedIndex);
    else if (currentScreen === 'write') formRef.current?.requestSubmit(); // 폼 제출
    else if (currentScreen === 'detail') setIsPlaying((playing) => !playing);
  }

  function handleBack() {
    if (currentScreen === 'detail') {
      // 상세 → 목록으로, 보고 있던 기록에 커서
      const index = sortedDiaries.findIndex((d) => d.id === selectedDiary.id);
      goTo('list', index);
    } else if (currentScreen !== 'menu') {
      goToMenu(currentScreen);
    }
  }

  function handleMenu() {
    goTo('menu');
  }

  // 새 기록 저장
  function handleSave(form) {
    const newDiary = {
      id: Date.now(), // 임시 id (나중엔 DB가 자동으로 만들어줘요)
      date: getToday(),
      ...form, // songTitle, artist, mood, memo
      createdAt: new Date().toISOString(),
    };
    setDiaries((prev) => [...prev, newDiary]);
    // 저장하면 바로 Now Playing 화면으로!
    setSelectedDiary(newDiary);
    setIsPlaying(true);
    setCurrentScreen('detail');
  }

  // ===== 키보드 조작 =====
  // 의존성 배열이 없으면 렌더링될 때마다 다시 등록돼요.
  // 그래서 항상 "최신 상태"를 보는 handleXXX 함수가 연결됩니다.
  useEffect(() => {
    function handleKeyDown(event) {
      const tag = event.target.tagName;

      // 입력칸에서 글자를 치는 중이면 Esc 말고는 무시
      // (안 그러면 Backspace 로 글자 지우다가 뒤로 가버려요!)
      if ((tag === 'INPUT' || tag === 'TEXTAREA') && event.key !== 'Escape') return;

      // 버튼에 포커스가 있을 때 Enter 는 브라우저가 알아서 클릭 처리해요 (두 번 실행 방지)
      if (tag === 'BUTTON' && event.key === 'Enter') return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault(); // 화살표로 페이지가 스크롤되는 것 막기
          handleUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          handleDown();
          break;
        case 'ArrowLeft':
          handleLeft();
          break;
        case 'ArrowRight':
          handleRight();
          break;
        case 'Enter':
          handleOk();
          break;
        case 'Escape':
        case 'Backspace':
          handleBack();
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    // 정리(cleanup): 다음 등록 전에 이전 리스너를 꼭 제거!
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // ===== 지금 화면에 맞는 내용 고르기 =====
  function renderScreen() {
    switch (currentScreen) {
      case 'menu':
        return <MainMenu selectedIndex={selectedIndex} onSelect={openMenuItem} />;
      case 'write':
        return <DiaryForm formRef={formRef} onSave={handleSave} />;
      case 'list':
        return (
          <DiaryList diaries={sortedDiaries} selectedIndex={selectedIndex} onSelect={openDiary} />
        );
      case 'detail':
        return (
          <NowPlaying
            // key 가 바뀌면 컴포넌트를 새로 만들어서 진행바 애니메이션이 처음부터 시작돼요.
            key={selectedDiary.id}
            diary={selectedDiary}
            position={sortedDiaries.findIndex((d) => d.id === selectedDiary.id) + 1}
            total={sortedDiaries.length}
            isPlaying={isPlaying}
          />
        );
      case 'calendar':
        return <ComingSoon name="달력" />;
      case 'stats':
        return <ComingSoon name="통계" />;
      default:
        return null;
    }
  }

  return (
    <div className="page">
      <div className="player">
        <div className="player-top">
          <span className="brand">MOODBOX</span>
          <span className="led" />
        </div>

        <Screen title={SCREEN_TITLES[currentScreen]}>{renderScreen()}</Screen>

        <div className="holo-sticker">✦ Y2K EDITION ✦</div>

        <ControlWheel
          onUp={handleUp}
          onDown={handleDown}
          onLeft={handleLeft}
          onRight={handleRight}
          onOk={handleOk}
          onMenu={handleMenu}
          onBack={handleBack}
        />
      </div>

      <p className="help">↑↓ 이동 · ←→ 이전/다음 곡 · Enter 선택 · Esc 뒤로</p>
    </div>
  );
}
