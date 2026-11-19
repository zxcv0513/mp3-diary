package com.example.musicdiary.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 음악 일기 한 건 = diary 테이블의 한 줄(row).
 *
 * @Entity 를 붙이면 JPA 가 "이 클래스는 DB 테이블과 연결된 클래스구나" 하고 알아봐요.
 * 필드 이름은 자동으로 snake_case 컬럼이 돼요. (songTitle → song_title)
 */
@Entity
@Getter // Lombok: 모든 필드의 getter 를 자동으로 만들어줘요 (getId(), getSongTitle() ...)
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA 가 내부적으로 쓰는 기본 생성자. 밖에서 막 쓰지 못하게 protected
public class Diary {

    @Id // 기본 키(PK)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 는 DB 가 1, 2, 3... 자동 증가
    private Long id;

    @Column(nullable = false) // NOT NULL
    private LocalDate date; // 기록 날짜 (2026-11-19 처럼 날짜만)

    @Column(nullable = false, length = 100)
    private String songTitle;

    @Column(nullable = false, length = 100)
    private String artist;

    @Enumerated(EnumType.STRING) // DB 에 0, 1 같은 숫자가 아니라 "HAPPY" 글자 그대로 저장
    @Column(nullable = false, length = 20)
    private Mood mood;

    @Column(columnDefinition = "TEXT") // 메모는 비워도 OK, 긴 글도 들어가게 TEXT 타입
    private String memo;

    @Column(nullable = false, updatable = false) // 작성 시간은 한 번 저장되면 수정 불가
    private LocalDateTime createdAt;

    // 새 일기를 만들 때 쓰는 생성자 (id, createdAt 은 자동으로 채워지니까 받지 않아요)
    public Diary(LocalDate date, String songTitle, String artist, Mood mood, String memo) {
        this.date = date;
        this.songTitle = songTitle;
        this.artist = artist;
        this.mood = mood;
        this.memo = memo;
    }

    // DB 에 처음 저장(INSERT)되기 직전에 JPA 가 자동으로 호출해줘요.
    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
