package com.instagram.clone.service;

import com.instagram.clone.entity.Like;
import com.instagram.clone.repository.FeedRepository;
import com.instagram.clone.repository.LikeRepository;
import com.instagram.clone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;

    @Transactional
    public boolean toggleLike(Long targetId, String targetType, Long userNum) {
        // 1. target_id와 target_type을 모두 체크해서 기존 좋아요 검색
        Optional<Like> alreadyLike = likeRepository.findByTargetIdAndTargetTypeAndUserUserNum(
                targetId, targetType, userNum
        );

        if (alreadyLike.isPresent()) {
            likeRepository.delete(alreadyLike.get());
            return false;
        } else {
            Like like = new Like();
            like.setTargetId(targetId);
            like.setTargetType(targetType); // "FEED" 또는 "COMMENT"
            like.setUser(userRepository.getReferenceById(userNum));

            // 피드 좋아요일 경우 기존 feed_id 컬럼도 채워주면 좋음 (선택사항)
            if ("FEED".equals(targetType)) {
                like.setFeed(feedRepository.getReferenceById(targetId));
            }

            likeRepository.save(like);
            return true;
        }
    }
}