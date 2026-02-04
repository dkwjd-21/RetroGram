package com.instagram.clone.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private Long userNum;       // 회원번호.
    private String userId;      // 사용자아이디 (@..)
    private String password;    // 암호화된 비밀번호
    private String email;       // 이메일
    private String bio;         // 소개글
    private String imgUrl;      // 프로필이미지 URL
    private LocalDateTime createdAt;     // 계정생성일
    @JsonProperty("isPrivate")
    private boolean isPrivate;  // 비공개여부
}
