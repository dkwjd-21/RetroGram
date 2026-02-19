package com.instagram.clone.controller;

import com.instagram.clone.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/{targetId}")
    public ResponseEntity<Boolean> toggleLike(
            @PathVariable Long targetId, // 게시물 ID 혹은 댓글 ID가 들어옴
            @RequestBody Map<String, Object> body
    ) {
        Object userNumObj = body.get("userNum");
        Object targetTypeObj = body.get("targetType");

        if (userNumObj == null || targetTypeObj == null) {
            return ResponseEntity.badRequest().build();
        }

        Long userNum = Long.valueOf(userNumObj.toString());
        String targetType = targetTypeObj.toString();

        return ResponseEntity.ok(likeService.toggleLike(targetId, targetType, userNum));
    }
}