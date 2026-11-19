package com.example.musicdiary.controller;

import com.example.musicdiary.dto.DiaryRequest;
import com.example.musicdiary.dto.DiaryResponse;
import com.example.musicdiary.service.DiaryService;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 일기 API 창구 — HTTP 요청을 받아서 Service 에 일을 맡기고, 결과를 JSON 으로 돌려줘요.
 *
 * Controller 는 "받고 → 넘기고 → 돌려주기"만 해요. 실제 로직은 Service 에!
 *
 * TODO(업그레이드)
 *   - PUT /api/diaries/{id}    기록 수정
 *   - DELETE /api/diaries/{id} 기록 삭제
 *   - @Valid 로 입력값 검증
 */
@RestController // 리턴값을 화면(HTML)이 아니라 JSON 으로 바꿔서 응답해요
@RequestMapping("/api/diaries") // 이 클래스의 모든 주소 앞에 /api/diaries 가 붙어요
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    // 기록 목록 / 날짜로 찾기
    //   GET /api/diaries                  → 전체 (최신순)
    //   GET /api/diaries?date=2026-11-18  → 그 날짜 기록만
    // 주소가 같아서 하나의 메서드에서 date 가 있는지 없는지로 나눠요.
    @GetMapping
    public List<DiaryResponse> getDiaries(
            @RequestParam(required = false) // ?date= 는 없어도 OK
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) // "2026-11-18" 형식 글자를 LocalDate 로 변환
            LocalDate date
    ) {
        if (date != null) {
            return diaryService.findByDate(date);
        }
        return diaryService.findAll();
    }

    // 기록 하나 보기
    //   GET /api/diaries/3  → 주소의 3 이 id 로 들어와요
    @GetMapping("/{id}")
    public DiaryResponse getDiary(@PathVariable Long id) {
        return diaryService.findById(id);
    }

    // 기록 작성
    //   POST /api/diaries  (body 에 JSON)
    // @RequestBody: 요청 body 의 JSON 을 DiaryRequest 객체로 바꿔줘요.
    // 새로 "만들었다"는 의미로 200 OK 대신 201 Created 상태 코드를 돌려줘요.
    @PostMapping
    public ResponseEntity<DiaryResponse> createDiary(@RequestBody DiaryRequest request) {
        DiaryResponse response = diaryService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
