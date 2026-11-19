package com.example.musicdiary.dto;

import com.example.musicdiary.entity.Diary;
import com.example.musicdiary.entity.Mood;
import java.time.LocalDate;

/**
 * 프론트 → 서버로 "들어오는" 데이터 (기록 작성할 때 보내는 JSON)
 *
 * 예시 JSON:
 * {
 *   "date": "2026-11-19",
 *   "songTitle": "Ditto",
 *   "artist": "NewJeans",
 *   "mood": "CALM",
 *   "memo": "첫눈 올 것 같은 날씨"
 * }
 *
 * record: 데이터를 담기만 하는 클래스를 짧게 쓰는 문법 (Java 16+)
 *   → 생성자, getter(date(), songTitle() ...), equals 등을 자동으로 만들어줘요.
 *   → 한 번 만들면 값을 바꿀 수 없어서(불변) 안전해요.
 *
 * id, createdAt 은 서버가 정하는 값이라 받지 않아요.
 *
 * TODO(업그레이드): @NotBlank 같은 검증 추가 (빈 제목 막기)
 */
public record DiaryRequest(
        LocalDate date,
        String songTitle,
        String artist,
        Mood mood,
        String memo
) {

    // DTO → 엔티티 변환
    public Diary toEntity() {
        return new Diary(date, songTitle, artist, mood, memo);
    }
}
