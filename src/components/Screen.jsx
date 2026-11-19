// 기기의 작은 LCD 화면 틀
// 위쪽 상태바(제목 + 배터리)만 그리고, 안쪽 내용은 children 으로 받아요.
// → 어떤 화면을 보여줄지는 Player 가 정해서 넣어줍니다.
export default function Screen({ title, children }) {
  return (
    <div className="screen">
      <div className="screen-status">
        <span>{title}</span>
        <span className="battery">
          <span />
        </span>
      </div>
      <div className="screen-body">{children}</div>
    </div>
  );
}
