package com.instagram.clone.dto;

import com.instagram.clone.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentResponseDto {
    private Long id;
    private String content;
    private String userId;      // 작성자 아이디
    private String profileImg;  // 작성자 프로필 사진
    private LocalDateTime createdAt;

    // Entity -> DTO 변환 생성자
    public CommentResponseDto(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.userId = comment.getUser().getUserId(); // User 엔티티에서 가져옴
        this.profileImg = comment.getUser().getImgUrl();
        this.createdAt = comment.getCreatedAt();
    }
}