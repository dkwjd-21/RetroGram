package com.instagram.clone.repository;

import com.instagram.clone.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByTargetIdAndTargetTypeAndUserUserNum(Long targetId, String targetType, Long userNum);
}