package com.example.musicdiary.dto;

import com.example.musicdiary.entity.Diary;
import com.example.musicdiary.entity.Mood;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 서버 → 프론트로 "나가는" 데이터 (응답 JSON)
 *
 * 왜 엔티티(Diary)를 그대로 보내지 않을까?
 *   1. 엔티티는 DB 구조라서, 나중에 컬럼을 바꾸면 API 응답까지 같이 바뀌어버려요.
 *   2. 나중에 user 같은 연관 데이터가 붙으면 보여주면 안 되는 정보까지 나갈 수 있어요.
 *   → 그래서 "보여줄 것만" 골라 담는 DTO 를 따로 둬요.
 */
public record DiaryResponse(
        Long id,
        LocalDate date,
        String songTitle,
        String artist,
        Mood mood,
        String memo,
        LocalDateTime createdAt
) {

    // 엔티티 → DTO 변환
    // static 이라서 객체 없이 DiaryResponse.from(diary) 로 바로 호출해요.
    public static DiaryResponse from(Diary diary) {
        return new DiaryResponse(
                diary.getId(),
                diary.getDate(),
                diary.getSongTitle(),
                diary.getArtist(),
                diary.getMood(),
                diary.getMemo(),
                diary.getCreatedAt()
        );
    }
}
