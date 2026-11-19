package com.example.musicdiary.entity;

/**
 * 기분 종류.
 * 프론트엔드의 MOODS(src/data/fakeDiaries.js) value 값과 똑같이 맞춰야 해요.
 *
 * String 대신 enum 을 쓰면 정해진 5가지 값 말고는 들어갈 수 없어서
 * "HAPY" 같은 오타가 DB에 저장되는 걸 막을 수 있어요.
 */
public enum Mood {
    HAPPY,
    CALM,
    SAD,
    EXCITED,
    TIRED
}
