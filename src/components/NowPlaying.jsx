import { findMood } from '../data/fakeDiaries';
import { formatLongDate } from '../utils/date';

// 이퀄라이저 막대 개수
const EQ_BARS = [0, 1, 2, 3, 4, 5, 6];

// 기록 상세 화면 — 음악 재생 화면처럼 보여줘요.
export default function NowPlaying({ diary, position, total, isPlaying }) {
  const mood = findMood(diary.mood);
  // 제목이 길면 전광판처럼 흘러가게(marquee) 해요.
  const isLongTitle = diary.songTitle.length > 12;

  return (
    <div className={isPlaying ? 'now-playing' : 'now-playing paused'}>
      <div className="np-top">
        <span>{isPlaying ? '▶ PLAY' : '❚❚ PAUSE'}</span>
        <span>
          {position}/{total}
        </span>
      </div>

      <div className="np-date">{formatLongDate(diary.date)}</div>

      <div className="np-title-box">
        <span className={isLongTitle ? 'np-title marquee' : 'np-title'}>{diary.songTitle}</span>
      </div>
      <div className="np-artist">{diary.artist}</div>

      <div className="equalizer">
        {EQ_BARS.map((bar) => (
          // 막대마다 시작 시간을 조금씩 다르게 해서 들쭉날쭉 움직이게!
          <span key={bar} className="eq-bar" style={{ animationDelay: `${bar * 0.13}s` }} />
        ))}
      </div>

      <div className="np-mood">
        {mood.icon} {mood.label}
      </div>
      <p className="np-memo">{diary.memo ? `"${diary.memo}"` : '(메모 없음)'}</p>

      <div className="np-progress">
        <span />
      </div>
    </div>
  );
}
