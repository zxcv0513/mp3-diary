package com.example.musicdiary.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS 설정 — "이 주소에서 오는 요청은 받아줄게" 라고 브라우저에게 알려주는 설정.
 *
 * 로컬 개발 때는 Vite 프록시 덕분에 필요 없었지만,
 * 배포하면 프론트(xxx.pages.dev)와 백엔드 주소가 달라져서 이 설정이 없으면 브라우저가 요청을 막아요.
 *
 * 허용할 주소는 application.properties 의 app.cors.allowed-origins 에서 읽어요.
 * (배포 서버에서는 환경 변수 CORS_ALLOWED_ORIGINS 로 바꿀 수 있어요)
 */
@Configuration // Spring 이 시작할 때 읽어가는 설정 클래스
public class WebConfig implements WebMvcConfigurer {

    // 쉼표로 구분된 주소 목록 → 배열로 받아요
    @Value("${app.cors.allowed-origins}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // /api 로 시작하는 주소에만 적용
                .allowedOriginPatterns(allowedOrigins) // 패턴(*)도 쓸 수 있게 allowedOriginPatterns 사용
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
