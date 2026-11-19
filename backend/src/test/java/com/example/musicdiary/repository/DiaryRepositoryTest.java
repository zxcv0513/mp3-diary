package com.example.musicdiary.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.musicdiary.entity.Diary;
import com.example.musicdiary.entity.Mood;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

/**
 * @DataJpaTest: 서버 전체가 아니라 JPA 관련 부분만 띄워서 빠르게 테스트해요.
 * 테스트가 끝날 때마다 데이터가 자동으로 되돌려져서(롤백) 테스트끼리 서로 영향을 안 줘요.
 */
@DataJpaTest
class DiaryRepositoryTest {

    @Autowired // Spring 이 만들어 둔 DiaryRepository 구현체를 넣어줘요
    DiaryRepository diaryRepository;

    @Test
    void 저장하면_id와_작성시간이_자동으로_채워진다() {
        // given (준비)
        Diary diary = new Diary(LocalDate.of(2026, 11, 11), "Ditto", "NewJeans", Mood.CALM, "첫눈 올 것 같은 날씨");

        // when (실행)
        Diary saved = diaryRepository.save(diary);

        // then (검증)
        assertThat(saved.getId()).isNotNull(); // DB 가 id 를 만들어줬는지
        assertThat(saved.getCreatedAt()).isNotNull(); // @PrePersist 가 동작했는지
        assertThat(diaryRepository.findById(saved.getId())).isPresent();
    }

    @Test
    void 날짜로_찾으면_그날_기록만_나온다() {
        diaryRepository.save(new Diary(LocalDate.of(2026, 11, 17), "APT.", "ROSÉ & Bruno Mars", Mood.EXCITED, null));
        diaryRepository.save(new Diary(LocalDate.of(2026, 11, 17), "Supernova", "aespa", Mood.HAPPY, null));
        diaryRepository.save(new Diary(LocalDate.of(2026, 11, 12), "밤양갱", "비비", Mood.HAPPY, null));

        List<Diary> result = diaryRepository.findByDate(LocalDate.of(2026, 11, 17));

        assertThat(result).hasSize(2);
        assertThat(result).extracting(Diary::getSongTitle).containsExactlyInAnyOrder("APT.", "Supernova");
    }

    @Test
    void 전체_목록은_최신순으로_나온다() {
        diaryRepository.save(new Diary(LocalDate.of(2026, 11, 9), "Hype Boy", "NewJeans", Mood.SAD, null));
        diaryRepository.save(new Diary(LocalDate.of(2026, 11, 15), "좋은 날", "아이유", Mood.TIRED, null));
        diaryRepository.save(new Diary(LocalDate.of(2026, 11, 12), "밤양갱", "비비", Mood.HAPPY, null));

        List<Diary> result = diaryRepository.findAllByOrderByDateDescIdDesc();

        // 날짜가 늦은 것부터: 11/15 → 11/12 → 11/9
        assertThat(result).extracting(Diary::getSongTitle).containsExactly("좋은 날", "밤양갱", "Hype Boy");
    }
}
