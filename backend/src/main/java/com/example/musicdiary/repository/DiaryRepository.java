package com.example.musicdiary.repository;

import com.example.musicdiary.entity.Diary;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * diary 테이블에 데이터를 넣고 꺼내는 창구.
 *
 * 클래스가 아니라 interface 이고, 안에 구현 코드가 하나도 없어요!
 * JpaRepository<엔티티, PK타입> 을 상속하기만 하면
 * Spring Data JPA 가 실행할 때 구현체를 자동으로 만들어줘요.
 *
 * 공짜로 생기는 메서드 예시:
 *   save(diary)      저장 / 수정
 *   findById(id)     하나 찾기 (결과가 없을 수도 있어서 Optional 로 줘요)
 *   findAll()        전부 찾기
 *   deleteById(id)   삭제
 *   count()          개수
 */
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    // "쿼리 메서드": 메서드 이름만 규칙대로 지으면 SQL 을 자동으로 만들어줘요.

    // 날짜로 찾기 → SELECT * FROM diary WHERE date = ?
    // (하루에 여러 곡을 기록할 수도 있어서 List 로 받아요)
    List<Diary> findByDate(LocalDate date);

    // 최신순 전체 목록 → SELECT * FROM diary ORDER BY date DESC, id DESC
    // (프론트의 기록 목록 정렬 방식과 똑같이 맞췄어요)
    List<Diary> findAllByOrderByDateDescIdDesc();
}
