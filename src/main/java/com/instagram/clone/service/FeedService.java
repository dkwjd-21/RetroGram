package com.instagram.clone.service;

import com.instagram.clone.entity.Feed;
import com.instagram.clone.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;

    public List<Feed> getAllFeeds() {
        // 모든 피드를 최신순으로 가져온다.
        // 작성일 내림차순
        return feedRepository.findAll(Sort.by(Sort.Direction.DESC, "uploadTime"));
    }
}
