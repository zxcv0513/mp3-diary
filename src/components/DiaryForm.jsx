import { useState } from 'react';
import { MOODS } from '../data/fakeDiaries';
import { formatLongDate, getToday } from '../utils/date';

// 오늘 기록하기 화면
// formRef: 기기의 OK 버튼을 눌렀을 때 Player 가 이 폼을 제출할 수 있게 연결하는 통로
// onSave: 저장 버튼을 누르면 입력값을 Player 에게 넘겨주는 함수
export default function DiaryForm({ formRef, onSave }) {
  // 입력칸마다 상태를 하나씩 둬요 (= "제어 컴포넌트" 방식)
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [mood, setMood] = useState('HAPPY');
  const [memo, setMemo] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false); // 서버에 저장하는 중인지

  async function handleSubmit(event) {
    event.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 기본 동작 막기

    if (isSaving) return; // 저장 중에 또 누르면 두 번 저장되니까 무시

    if (!songTitle.trim() || !artist.trim()) {
      setError('노래 제목과 아티스트를 입력해주세요');
      return;
    }

    setIsSaving(true);
    setError('');
    try {
      // onSave(= Player 의 handleSave)가 서버 저장을 끝낼 때까지 기다려요.
      // 성공하면 Player 가 Now Playing 화면으로 넘겨줘요.
      await onSave({
        songTitle: songTitle.trim(),
        artist: artist.trim(),
        mood,
        memo: memo.trim(),
      });
    } catch {
      setError('저장에 실패했어요. 서버를 확인해주세요');
      setIsSaving(false); // 실패했을 때만 다시 누를 수 있게 풀어줘요
    }
  }

  return (
    <form ref={formRef} className="diary-form" onSubmit={handleSubmit}>
      <div className="form-date">{formatLongDate(getToday())}</div>

      <label>
        노래 제목
        <input
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          placeholder="ex) Ditto"
          maxLength={100}
          autoFocus
        />
      </label>

      <label>
        아티스트
        <input
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="ex) NewJeans"
          maxLength={100}
        />
      </label>

      <div className="form-label">기분</div>
      <div className="mood-picker">
        {MOODS.map((item) => (
          <button
            key={item.value}
            // type="button" 이 없으면 버튼을 누를 때마다 폼이 제출돼버려요!
            type="button"
            className={item.value === mood ? 'mood-btn selected' : 'mood-btn'}
            onClick={() => setMood(item.value)}
          >
            {item.icon}
            <small>{item.label}</small>
          </button>
        ))}
      </div>

      <label>
        한 줄 메모
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="오늘 이 노래를 들은 이유는?"
          maxLength={100}
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="form-submit" disabled={isSaving}>
        {isSaving ? '저장 중...' : '[ 저장하기 ]'}
      </button>
    </form>
  );
}
