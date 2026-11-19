package com.example.musicdiary.service;

import com.example.musicdiary.dto.DiaryRequest;
import com.example.musicdiary.dto.DiaryResponse;
import com.example.musicdiary.entity.Diary;
import com.example.musicdiary.repository.DiaryRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 일기 관련 "일 처리" 담당 (비즈니스 로직)
 *
 * 역할 나누기:
 *   Controller : 요청 받고 응답 돌려주기 (창구 직원)
 *   Service    : 실제 일 처리 (주방)      ← 여기
 *   Repository : DB 꺼내고 넣기 (창고)
 *
 * Controller 는 DTO 만 주고받고, 엔티티는 Service 안에서만 다뤄요.
 *
 * TODO(업그레이드)
 *   - 기록 수정(update), 삭제(delete)
 *   - 없는 id 조회 시 전용 예외 + 404 응답
 */
@Service // Spring 이 이 클래스를 객체(Bean)로 만들어서 관리해줘요
@RequiredArgsConstructor // Lombok: final 필드를 받는 생성자 자동 생성 → Spring 이 Repository 를 넣어줘요 (생성자 주입)
@Transactional(readOnly = true) // 기본은 "읽기 전용" 트랜잭션 (조회가 대부분이라서)
public class DiaryService {

    private final DiaryRepository diaryRepository;

    // 기록 작성
    @Transactional // 저장은 DB 를 바꾸니까 읽기 전용을 풀어줘요
    public DiaryResponse create(DiaryRequest request) {
        Diary saved = diaryRepository.save(request.toEntity());
        return DiaryResponse.from(saved);
    }

    // 기록 목록 (최신순)
    public List<DiaryResponse> findAll() {
        return diaryRepository.findAllByOrderByDateDescIdDesc()
                .stream()
                .map(DiaryResponse::from) // Diary 하나하나를 DiaryResponse 로 변환
                .toList();
    }

    // 기록 하나 보기
    public DiaryResponse findById(Long id) {
        Diary diary = diaryRepository.findById(id)
                // 일단은 기본 예외로 처리 (나중에 404 로 바꿀 예정)
                .orElseThrow(() -> new IllegalArgumentException("기록이 없어요. id=" + id));
        return DiaryResponse.from(diary);
    }

    // 날짜로 찾기
    public List<DiaryResponse> findByDate(LocalDate date) {
        return diaryRepository.findByDate(date)
                .stream()
                .map(DiaryResponse::from)
                .toList();
    }
}
