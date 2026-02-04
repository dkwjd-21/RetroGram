package com.instagram.clone.controller;

import com.instagram.clone.dto.FeedUpdateDto;
import com.instagram.clone.entity.Feed;
import com.instagram.clone.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/feeds")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FeedController {
    private final FeedService feedService;

    @GetMapping
    public List<Feed> getFeeds() {
        return feedService.getAllFeeds();
    }

    @PostMapping("/create")
    public void createFeed(
            @RequestParam("userId") String userId,
            @RequestParam("content") String content,
            @RequestParam("image") MultipartFile image
            ) throws IOException {
        feedService.createFeed(userId, content, image);
    }

    // 게시물 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFeed(@PathVariable Long id, @RequestBody FeedUpdateDto updateDto) {
        feedService.updateFeed(id, updateDto);
        return ResponseEntity.ok().build();
    }

    // 게시물 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFeed(@PathVariable Long id) {
        feedService.deleteFeed(id);
        return ResponseEntity.ok().build();
    }
}
