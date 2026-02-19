package com.instagram.clone.controller;

import com.instagram.clone.dto.CommentRequestDto;
import com.instagram.clone.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<String> createComment(@RequestBody CommentRequestDto dto) {
        commentService.saveComment(dto);
        return ResponseEntity.ok("댓글 작성 완료!");
    }
}