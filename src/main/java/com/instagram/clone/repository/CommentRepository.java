package com.instagram.clone.repository;

import com.instagram.clone.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 특정 피드의 댓글들만 시간순으로 가져오기
    List<Comment> findByFeedIdOrderByCreatedAtAsc(Long feedId);
}