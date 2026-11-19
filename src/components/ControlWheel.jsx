// 기기 아래쪽 조작부: 십자 버튼 + 가운데 OK + MENU / BACK 알약 버튼
// 버튼이 눌리면 어떤 일을 할지는 Player 가 정하고, 여기서는 함수만 받아서 연결해요.
export default function ControlWheel({ onUp, onDown, onLeft, onRight, onOk, onMenu, onBack }) {
  return (
    <div className="controls">
      <div className="dpad">
        <button className="dpad-btn up" onClick={onUp} aria-label="위">
          ▲
        </button>
        <button className="dpad-btn left" onClick={onLeft} aria-label="왼쪽">
          ◀
        </button>
        <button className="ok-btn" onClick={onOk}>
          OK
        </button>
        <button className="dpad-btn right" onClick={onRight} aria-label="오른쪽">
          ▶
        </button>
        <button className="dpad-btn down" onClick={onDown} aria-label="아래">
          ▼
        </button>
      </div>

      <div className="pill-row">
        <button className="pill-btn" onClick={onMenu}>
          MENU
        </button>
        <button className="pill-btn" onClick={onBack}>
          BACK
        </button>
      </div>
    </div>
  );
}
