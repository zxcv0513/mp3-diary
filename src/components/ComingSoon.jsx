// 아직 만들지 않은 화면(달력, 통계)에 임시로 보여줄 화면
export default function ComingSoon({ name }) {
  return (
    <div className="coming-soon">
      <p className="blink">준비 중...</p>
      <p>{name} 기능은 곧 만나요!</p>
    </div>
  );
}
