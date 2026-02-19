package com.instagram.clone.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자 필수
public class CommentRequestDto {
    private Long feedId;            // 어느 게시물에 다는지
    private Long userNum;           // 누가 다는지
    private String content;         // 댓글 내용
    private Long parentCommentId;   // 대댓글일 경우 부모 댓글의 ID (일반 댓글은 null)
}