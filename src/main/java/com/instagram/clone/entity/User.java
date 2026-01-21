package com.instagram.clone.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "users")  // MySQL의 users 테이블과 매핑
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNum;       // 회원번호
    //  @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 회원번호 생성을 데이터베이스에 전적으로 맡김 Auto Increment

    @Column(unique = true, nullable = false, length = 50)
    private String userId;      // 사용자아이디 (@..)

    @Column(nullable = false, length = 100)
    private String password;    // 암호화된 비밀번호

    @Column(unique = true, nullable = false)
    private String email;       // 이메일

    @Column(length = 1000)
    private String bio = null;         // 소개글

    private String imgUrl = null;      // 프로필이미지 URL

    @Column(updatable = false)
    private LocalDateTime createdAt;     // 계정생성일

    private boolean isPrivate = false;  // 비공개여부

    @PrePersist // 데이터가 데이터베이스에 처음 INSERT 되기 직전에 자동 실행
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }
}
