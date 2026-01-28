package com.instagram.clone.controller;

import com.instagram.clone.entity.Feed;
import com.instagram.clone.service.FeedService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

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
}
