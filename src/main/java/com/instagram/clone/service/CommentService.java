package com.instagram.clone.service;

import com.instagram.clone.dto.CommentRequestDto;
import com.instagram.clone.dto.CommentResponseDto;
import com.instagram.clone.entity.Comment;
import com.instagram.clone.entity.Feed;
import com.instagram.clone.entity.User;
import com.instagram.clone.repository.CommentRepository;
import com.instagram.clone.repository.FeedRepository;
import com.instagram.clone.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;

    @Transactional
    public void saveComment(CommentRequestDto dto) {
        // 1. 피드랑 유저가 실제로 있는지 확인
        Feed feed = feedRepository.findById(dto.getFeedId())
                .orElseThrow(() -> new IllegalArgumentException("피드가 없어용"));
        User user = userRepository.findById(dto.getUserNum())
                .orElseThrow(() -> new IllegalArgumentException("유저가 없어용"));

        // 2. 엔티티 생성 후 저장
        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setFeed(feed);
        comment.setUser(user);

        commentRepository.save(comment);
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getComments(Long feedId) {
        List<Comment> comments = commentRepository.findByFeedIdOrderByCreatedAtAsc(feedId);
        return comments.stream()
                .map(CommentResponseDto::new) // DTO로 변환
                .collect(Collectors.toList());
    }
}