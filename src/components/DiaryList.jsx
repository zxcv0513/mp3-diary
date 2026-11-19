import { useEffect, useRef } from 'react';
import { findMood } from '../data/fakeDiaries';
import { formatShortDate } from '../utils/date';

export default function DiaryList({ diaries, selectedIndex, onSelect }) {
  // 선택된 줄(li)을 가리키는 ref
  const selectedRef = useRef(null);

  // 선택이 바뀔 때마다 그 줄이 화면 안에 보이도록 스크롤해요.
  // (화면이 작아서 기록이 많으면 아래쪽이 가려지기 때문)
  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (diaries.length === 0) {
    return (
      <p className="empty">
        아직 기록이 없어요.
        <br />
        오늘의 노래를 남겨보세요!
      </p>
    );
  }

  return (
    <ul className="diary-list">
      {diaries.map((diary, index) => {
        const isSelected = index === selectedIndex;
        return (
          <li
            key={diary.id}
            ref={isSelected ? selectedRef : null}
            className={isSelected ? 'diary-item selected' : 'diary-item'}
            onClick={() => onSelect(index)}
          >
            <span className="diary-date">{formatShortDate(diary.date)}</span>
            <span className="diary-song">
              {diary.songTitle} <small>- {diary.artist}</small>
            </span>
            <span>{findMood(diary.mood).icon}</span>
          </li>
        );
      })}
    </ul>
  );
}
